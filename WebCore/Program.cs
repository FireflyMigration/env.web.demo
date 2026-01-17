using ENV.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Northwind.Server.App_Start;
using Firefly.Box;
using ENV.Web;

namespace Northwind.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var app = builder.Build();

            app.UseMiddleware<WebContextMiddleware>();

            app.MapMethods("/Request.aspx", ["GET", "POST"], () =>
            {
                Application.Instance.ProcessWebRequest();
            });

            var dataApi = new DataApi();
            dataApi.Register(typeof(Northwind.Models.Categories), true);

            app.MapMethods("/dataApi/{name?}/{id?}", ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                (string name, string id) =>
            {
                dataApi.ProcessRequest(name, id);
            });

            AppServerConfig.Register(app.Environment.ContentRootPath);

            app.Run();
        }
    }
}

