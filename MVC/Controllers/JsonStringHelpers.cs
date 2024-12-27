using Firefly.Box;

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