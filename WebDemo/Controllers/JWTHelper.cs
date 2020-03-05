﻿using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace WebDemo
{
    public class JwtHelper
    {
        public JwtHelper(string secret)
        {
            _secret = secret;
        }
        public string GetToken<T>(T info) where T : JwtUserInfo
        {

            var algorithm = new HMACSHA256Algorithm();

            var serializer = new JsonNetSerializer(new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
            var urlEncoder = new JwtBase64UrlEncoder();
            var encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            return encoder.Encode(info, _secret);
        }
        string _secret;

        public void AuthenticateRequest()
        {
            const string AuthorizationHeader = "Authorization";
            var token = HttpContext.Current.Request.Headers[AuthorizationHeader];
            if (string.IsNullOrEmpty(token))
            {
                var cookie = HttpContext.Current.Request.Cookies.Get(AuthorizationHeader);
                if (cookie != null)
                {
                    token = cookie.Value;
                }
            }
            myPrinciple p = null;
            if (!string.IsNullOrEmpty(token))
            {
                const string bearer = "Bearer ";
                if (token.StartsWith(bearer))
                    token = token.Substring(bearer.Length);

                try
                {
                    IJsonSerializer serializer = new JsonNetSerializer();
                    IDateTimeProvider provider = new UtcDateTimeProvider();
                    IJwtValidator validator = new JwtValidator(serializer, provider);
                    IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                    IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

                    var json = decoder.Decode(token, _secret, verify: true);
                    var x = JsonConvert.DeserializeObject<JwtUserInfo>(json);
                    p = new myPrinciple(x.Name, x.Roles);



                }
                catch (TokenExpiredException)
                {
                    Console.WriteLine("Token has expired");
                }
                catch (SignatureVerificationException)
                {
                    Console.WriteLine("Token has invalid signature");
                }
                catch
                {
                }
            }
            System.Threading.Thread.CurrentPrincipal = p;
            if (HttpContext.Current != null)
            {
                HttpContext.Current.User = p;
            }
            if (p != null)
            {
                var u = new ENV.Security.User(p.Name, p.Name, "", "", "");
                ENV.Security.UserManager.SetCurrentUser(u);
            }
        }
    }
    class myPrinciple : IPrincipal, IIdentity
    {
        string _name;
        HashSet<string> _roles;
        public myPrinciple(string name, HashSet<string> roles)
        {
            _name = name;
            _roles = roles;
        }
        public IIdentity Identity => this;

        public string Name => _name;

        public string AuthenticationType => "Bearer ";

        public bool IsAuthenticated => true;

        public bool IsInRole(string role)
        {
            return _roles.Contains(role);
        }
    }
    public class JwtUserInfo
    {
        public JwtUserInfo(string name, params string[] roles)
        {
            this.Name = name;
            this.Roles = new HashSet<string>(roles);
        }
        public string Name { get; set; }
        public HashSet<string> Roles { get; set; }
    }
}