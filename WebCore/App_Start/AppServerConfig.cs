namespace Northwind.Server.App_Start
{
    class AppServerConfig
    {
        public static void Register(string contentRootPath)
        {
            ENV.Common.SuppressDialogs();
            ENV.Data.DataProvider.ConnectionManager.UseConnectionPool = true;
            System.Environment.CurrentDirectory = contentRootPath;
            Northwind.Program.Init(new string[] { "/ini=Northwind.Server.ini", "@additions.ini" });
            ENV.ApplicationControllerBase.SetRootApplicationFactory(() => Northwind.Application.Instance);
        }
    }
}
