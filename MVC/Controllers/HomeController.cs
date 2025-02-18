﻿using ENV.Web;
using Firefly.Box;
using System.Net;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {

        public void Run(string prgname)
        {
            Northwind.Application.Instance.ProcessWebRequest(prgname);
        }

        DataResult ToJson(ENV.Data.Entity e)
        {
            return new ViewModel(e).ExportRows();
        }

        private static void StreamResult(string url)
        {
            var req = WebRequest.Create(url);
            var result = req.GetResponse();
            var resultStream = result.GetResponseStream();
            var response = System.Web.HttpContext.Current.Response;
            foreach (var item in result.Headers.AllKeys)
            {
                response.AddHeader(item, result.Headers[item]);
            }


            using (var os = response.OutputStream)
            {
                int v;
                while ((v = resultStream.ReadByte()) > -1)
                {
                    os.WriteByte((byte)v);
                }
            }
        }


        [ENV.Web.PrintToPDF]
        public void Print(int id)
        {
            new Northwind.Orders.Print_Order().Run(id);
        }
        [PrintToPDF]
        public void OrdersReport(string fromDate, string toDate)
        {
            //new Northwind.Orders.Print_Orders().Run(Date.Parse(fromDate, "YYYY-MM-DD"), Date.Parse(toDate, "YYYY-MM-DD"));

        }
        public string DoSomething()
        {
            return "Hello World " + ENV.Security.UserManager.CurrentUser.Name;
        }

    }
}