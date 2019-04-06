using ENV.Web;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [ENV.Web.PrintToPDF]
        public void Print(int id)
        {
            new Northwind.Orders.Print_Order().Run(id);
        }
        public string DoSomething()
        {
            return "Hello World";
        }

        public ActionResult Login(string userName)
        {
            var payload = new Dictionary<string, object>
            {
                { "name",userName },
                { "roles", new []{ "Admin","Login"} }
            };
            const string secret = "GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk";

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            var token = encoder.Encode(payload, secret);

            return Json(new { Name = userName, token = token });
        }
    }
}