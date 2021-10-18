using System;
using System.Collections.Generic;
using System.Text;
using Firefly.Box;
using ENV;
using ENV.Web;

namespace MVC.ViewModels
{
    class ProductsViewModel : ViewModel
    {

        public readonly Northwind.Models.Products Products = new Northwind.Models.Products();
        public ProductsViewModel()
        {
            From = Products;
            AllowUpdate = true;
            AllowInsert = true;
            AllowDelete = true;

        }
        protected override void OnSavingRow()
        {
            if (Activity == Activities.Insert)
                Products.ProductID.Value = Products.Max(Products.ProductID) + 1;
            ModelState.Required(Products.ProductName);
            ModelState.Exists(Products.SupplierID, new Northwind.Models.Suppliers().SupplierID);
            ModelState.Exists(Products.CategoryID, new Northwind.Models.Categories().CategoryID);
        }
    }
}
