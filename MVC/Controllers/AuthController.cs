using System.Web.Mvc;

namespace MVC.Controllers
{
    public class AuthController : Controller
    {
        [HttpPost]
        public ActionResult Login(string userName, string password)
        {
            var userInfo = new JwtUserInfo(userName, userName, "Admin", "Login");
            Response.SetCookie(new System.Web.HttpCookie("Authorization", MvcApplication.Jwt.GetToken(userInfo))
            {
                HttpOnly = true,
                Secure = true,
                SameSite = System.Web.SameSiteMode.Strict
            });
            return Json(userInfo);
        }
        [HttpPost]
        public ActionResult Logout()
        {
            Response.SetCookie(new System.Web.HttpCookie("Authorization", "")
            {
                HttpOnly = true,
                Secure = true,
                SameSite = System.Web.SameSiteMode.Strict
            });
            return Json("ok");
        }
        public ActionResult Me()
        {
            if (JwtUserInfo.CurrentUser.Value == null)
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(JwtUserInfo.CurrentUser.Value, JsonRequestBehavior.AllowGet);
        }
    }
}