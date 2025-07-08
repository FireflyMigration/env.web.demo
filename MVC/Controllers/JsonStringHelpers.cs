using Firefly.Box;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC.Controllers
{
    public static class JsonStringHelpers
    {
        public static Date JsonToDate(this string date)
        {
            return Date.Parse(date, "YYYY-MM-DD");
        }
    }
}