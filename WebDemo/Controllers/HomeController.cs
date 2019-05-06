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
        [Authorize]
        public string DoSomething()
        {
            return "Hello World " + ENV.Security.UserManager.CurrentUser.Name;
        }

        public ActionResult Login(string userName)
        {
            var payload = new JwtUserInfo(userName, "Admin", "Login");
            return Json(new { token = MvcApplication.Jwt.GetToken(payload) });
        }
    }
}