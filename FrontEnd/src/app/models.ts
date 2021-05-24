import { Column, DateOnlyValueConverter, Entity, EntityBase } from '@remult/core';

@Entity({ key: 'Categories' })
export class Categories extends EntityBase {
    @Column({ caption: 'CategoryID' })
    id: number;
    @Column()
    categoryName: string;
    @Column()
    description: string;



}
@Entity({ key: 'Orders' })
export class Orders extends EntityBase {
    @Column({ caption: 'OrderID' })
    id: number;
    @Column()
    customerID: string;
    @Column()
    employeeID: number;
    @Column({ valueConverter: () => DateOnlyValueConverter })
    orderDate: Date;
    @Column({ valueConverter: () => DateOnlyValueConverter })
    requiredDate: Date;
    @Column({ valueConverter: () => DateOnlyValueConverter })
    shippedDate: Date;
    @Column()
    shipVia: number;
    @Column()
    freight: number;
    @Column()
    shipName: string;
    @Column()
    shipAddress: string;
    @Column()
    shipCity: string;
    @Column()
    shipRegion: string;
    @Column()
    shipPostalCode: string;
    @Column()
    shipCountry: string;

}
@Entity({ key: 'OrderDetails' })
export class OrderDetails extends EntityBase {
    @Column()
    orderID: number;
    @Column()
    productID: number;
    @Column()
    unitPrice: number;
    @Column()
    quantity: number;
    @Column()
    discount: number;
    @Column()
    id: string;

}
@Entity({ key: 'Customers' })
export class Customers extends EntityBase {
    @Column({ caption: 'CustomerID' })
    id: string;
    @Column()
    companyName: string;
    @Column()
    contactName: string;
    @Column()
    contactTitle: string;
    @Column()
    address: string;
    @Column()
    city: string;
    @Column()
    region: string;
    @Column()
    postalCode: string;
    @Column()
    country: string;
    @Column()
    phone: string;
    @Column()
    fax: string;

}

@Entity({ key: 'Shippers' })
export class Shippers extends EntityBase {
    @Column({ caption: 'ShipperID' })
    id: number;
    @Column()
    companyName: string;
    @Column()
    phone: string;

}
@Entity({ key: 'Products' })
export class Products extends EntityBase {
    @Column({ caption: 'ProductID' })
    id: number;
    @Column()
    productName: string;
    @Column()
    supplierID: number;
    @Column()
    categoryID: number;
    @Column()
    quantityPerUnit: string;
    @Column()
    unitPrice: number;
    @Column()
    unitsInStock: number;
    @Column()
    unitsOnOrder: number;
    @Column()
    reorderLevel: number;
    @Column()
    discontinued: boolean;

}
@Entity({ key: 'Suppliers' })
export class Suppliers extends EntityBase {
    @Column({ caption: 'SupplierID' })
    id: number;
    @Column()
    companyName: string;

}