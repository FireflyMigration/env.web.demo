import { Field, Entity, EntityBase, DateOnlyField } from 'remult';

@Entity({ key: 'Categories' })
export class Categories extends EntityBase {
    @Field({ caption: 'CategoryID' })
    id: number;
    @Field()
    categoryName: string;
    @Field()
    description: string;



}
@Entity({ key: 'Orders' })
export class Orders extends EntityBase {
    @Field({ caption: 'OrderID' })
    id: number;
    @Field()
    customerID: string;
    @Field()
    employeeID: number;
    @DateOnlyField()
    orderDate: Date;
    @DateOnlyField()
    requiredDate: Date;
    @DateOnlyField()
    shippedDate: Date;
    @Field()
    shipVia: number;
    @Field()
    freight: number;
    @Field()
    shipName: string;
    @Field()
    shipAddress: string;
    @Field()
    shipCity: string;
    @Field()
    shipRegion: string;
    @Field()
    shipPostalCode: string;
    @Field()
    shipCountry: string;

}
@Entity({ key: 'OrderDetails' })
export class OrderDetails extends EntityBase {
    @Field()
    orderID: number;
    @Field()
    productID: number;
    @Field()
    unitPrice: number;
    @Field()
    quantity: number;
    @Field()
    discount: number;
    @Field()
    id: string;

}
@Entity({ key: 'Customers' })
export class Customers extends EntityBase {
    @Field({ caption: 'CustomerID' })
    id: string;
    @Field()
    companyName: string;
    @Field()
    contactName: string;
    @Field()
    contactTitle: string;
    @Field()
    address: string;
    @Field()
    city: string;
    @Field()
    region: string;
    @Field()
    postalCode: string;
    @Field()
    country: string;
    @Field()
    phone: string;
    @Field()
    fax: string;

}

@Entity({ key: 'Shippers' })
export class Shippers extends EntityBase {
    @Field({ caption: 'ShipperID' })
    id: number;
    @Field()
    companyName: string;
    @Field()
    phone: string;

}
@Entity({ key: 'Products' })
export class Products extends EntityBase {
    @Field({ caption: 'ProductID' })
    id: number;
    @Field()
    productName: string;
    @Field()
    supplierID: number;
    @Field()
    categoryID: number;
    @Field()
    quantityPerUnit: string;
    @Field()
    unitPrice: number;
    @Field()
    unitsInStock: number;
    @Field()
    unitsOnOrder: number;
    @Field()
    reorderLevel: number;
    @Field()
    discontinued: boolean;

}
@Entity({ key: 'Suppliers' })
export class Suppliers extends EntityBase {
    @Field({ caption: 'SupplierID' })
    id: number;
    @Field()
    companyName: string;

}