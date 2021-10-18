using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ENV.Web;

namespace MVC.Controllers
{
    public class DataApiController : Controller
    {
        static DataApi _dataApi = new DataApi();
        static DataApiController()
        {
            

            _dataApi.Register("orders",typeof(ViewModels.OrdersViewModel));
            _dataApi.Register("customers", typeof(ViewModels.CustomersViewModel));
            _dataApi.Register("products", typeof(ViewModels.ProductsViewModel));

            _dataApi.Register("orderDetails", typeof(Northwind.Models.Order_Details),true);

            _dataApi.Register(typeof(Northwind.Models.Categories), true);
            _dataApi.Register(typeof(Northwind.Models.Shippers));
            _dataApi.Register(typeof(Northwind.Models.Suppliers));

        }
        // GET: DataApi
        public void Index(string name, string id = null)
        {
            _dataApi.ProcessRequest(name, id);
        }
    }
}