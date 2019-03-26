using System;
using System.Collections.Generic;
using System.Text;
using Firefly.Box;
using ENV;
using ENV.Web;

namespace WebDemo.ViewModels
{
    class CustomersViewModel : ViewModel
    {

        public readonly Northwind.Models.Customers Customers = new Northwind.Models.Customers();

        public CustomersViewModel()
        {
            From = Customers;
            AllowUpdate = true;
            AllowInsert = true;
            AllowDelete = true;

        }
        protected override void OnSavingRow()
        {
            ModelState.Required(Customers.CompanyName);
            ModelState.Exists(Customers.CustomerID, new Northwind.Models.Customers().CustomerID);

            if (Customers.CustomerID.WasChanged)
                if (Customers.Contains(Customers.CustomerID.IsEqualTo(Customers.CustomerID.Value)))
                    ModelState.AddError(Customers.CustomerID, "Customer ID already in use");
        }
    }
}
