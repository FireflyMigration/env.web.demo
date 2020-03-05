import * as radweb from '@remult/core';
import { EntityClass } from '@remult/core';

@EntityClass
export class Categories extends radweb.Entity<number> {
    id = new radweb.NumberColumn('CategoryID');
    categoryName = new radweb.StringColumn();
    description = new radweb.StringColumn();

    constructor() {
        super( 'Categories');
    }
}
@EntityClass
export class Orders extends radweb.Entity<number> {
    id = new radweb.NumberColumn('OrderID');
    customerID = new radweb.StringColumn();
    employeeID = new radweb.NumberColumn();
    orderDate = new radweb.DateColumn();
    requiredDate = new radweb.DateColumn();
    shippedDate = new radweb.DateColumn();
    shipVia = new radweb.NumberColumn();
    freight = new radweb.NumberColumn();
    shipName = new radweb.StringColumn();
    shipAddress = new radweb.StringColumn();
    shipCity = new radweb.StringColumn();
    shipRegion = new radweb.StringColumn();
    shipPostalCode = new radweb.StringColumn();
    shipCountry = new radweb.StringColumn();

    constructor() {
        super( 'Orders');
    }
}
@EntityClass
export class OrderDetails extends radweb.Entity<string> {
    orderID = new radweb.NumberColumn();
    productID = new radweb.NumberColumn();
    unitPrice = new radweb.NumberColumn();
    quantity = new radweb.NumberColumn();
    discount = new radweb.NumberColumn();
    id = new radweb.StringColumn();

    constructor() {
        super( 'OrderDetails');
        
    }
}
@EntityClass
export class Customers extends radweb.Entity<string> {
    id = new radweb.StringColumn('CustomerID');
    companyName = new radweb.StringColumn();
    contactName = new radweb.StringColumn();
    contactTitle = new radweb.StringColumn();
    address = new radweb.StringColumn();
    city = new radweb.StringColumn();
    region = new radweb.StringColumn();
    postalCode = new radweb.StringColumn();
    country = new radweb.StringColumn();
    phone = new radweb.StringColumn();
    fax = new radweb.StringColumn();

    constructor() {
        super('Customers');
    }
}
        
@EntityClass
export class Shippers extends radweb.Entity<number> {
    id = new radweb.NumberColumn('ShipperID');
    companyName = new radweb.StringColumn();
    phone = new radweb.StringColumn();

    constructor() {
        super( 'Shippers');
    }
}
@EntityClass
export class Products extends radweb.Entity<number> {
    id = new radweb.NumberColumn('ProductID');
    productName = new radweb.StringColumn();
    supplierID = new radweb.NumberColumn();
    categoryID = new radweb.NumberColumn();
    quantityPerUnit = new radweb.StringColumn();
    unitPrice = new radweb.NumberColumn();
    unitsInStock = new radweb.NumberColumn();
    unitsOnOrder = new radweb.NumberColumn();
    reorderLevel = new radweb.NumberColumn();
    discontinued = new radweb.BoolColumn();

    constructor() {
        super( 'Products');
    }
}
@EntityClass
export class Suppliers extends radweb.Entity<number> {
    id = new radweb.NumberColumn('SupplierID');
    companyName = new radweb.StringColumn();

    constructor() {
        super('Suppliers');
    }
}