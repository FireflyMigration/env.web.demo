using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using ENV.Data.DataProvider;
using System.IO;
using JWT;
using JWT.Serializers;
using Newtonsoft.Json;
using System.Security.Principal;
using System.Configuration;

namespace MVC
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static JwtHelper Jwt;
        protected void Application_Start()
        {
            //commented out for performance - it uses reflection to read everything - just expensive.
            //   AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            ENV.Common.SuppressDialogs();

            //todo - replace secret with something that is secrative;
            string jwtSecret = ConfigurationManager.AppSettings.Get("JwtKey");
            if (string.IsNullOrEmpty(jwtSecret))
            {
#if DEBUG
                jwtSecret = ("GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk");
#else
            throw new InvalidOperationException("You must configure a JwtKey value in the web confiug to secure the Jwt Authentication");
#endif
            }
            Jwt = new JwtHelper(jwtSecret);


            ConnectionManager.UseConnectionPool = true;

            //sets the current directory to the bin directory in the parent directory
            Environment.CurrentDirectory =
               Path.Combine(
                Path.GetDirectoryName(HttpContext.Current.Server.MapPath("")), "bin");
            //determines where the appliaction dlls are
            ENV.AbstractFactory.AlternativeDllPath = Environment.CurrentDirectory;

            // Call the init of the original application to load it's ini and other settings
            Northwind.Program.Init(new string[0]);

            //ApplicationStartup=B && DeploymentMode=B
            ENV.UserSettings.DoNotDisplayUI = true;

            //connection to sql server without a user and password requires giving permission to the iis user
            //Instead I use an sql server password for this demo
            // Add this row when you move to a regular IIS, as IIS Express allows anonimous authentication
            ConnectionManager.SetDefaultUserAndPassword("sa", "MASTERKEY");

            // so that btrieve tables will have a primary key we can use.
            BtrieveEntity.UseBtrievePosition = true;

        }
        [ThreadStatic]
        static IDisposable _profilerContext;
        protected void Application_BeginRequest(object sender, System.EventArgs e)
        {
            Firefly.Box.Context.Current.SetNonUIThread();
            _profilerContext = ENV.Utilities.Profiler.StartContextAndSaveOnEnd(() => ENV.ProgramCollection.CollectRequestPArametersForProfiler(), () => VirtualPathUtility.MakeRelative("~", Request.Url.AbsolutePath).Replace("/", "_") + "_" + Firefly.Box.Date.Now.ToString("YYYYMMDD") + "_" + ENV.UserMethods.Instance.mTime().ToString());

        }
        public void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            Jwt.AuthenticateRequest();
        }

        protected void Application_EndRequest(object sender, System.EventArgs e)
        {
            if (_profilerContext != null)
            {
                _profilerContext.Dispose();
                _profilerContext = null;
            }
            Firefly.Box.Context.Current.Dispose();
        }
    }
}
