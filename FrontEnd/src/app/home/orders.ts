import { EntityClass, Entity, NumberColumn, StringColumn, DateColumn, BoolColumn } from '@remult/core';

@EntityClass
export class Orders extends Entity<number> {
    id = new NumberColumn({ caption: 'OrderID' });
    customerID = new StringColumn();
    employeeID = new NumberColumn();
    orderDate = new DateColumn();
    requiredDate = new DateColumn();
    shippedDate = new DateColumn();
    shipVia = new NumberColumn();
    freight = new NumberColumn();
    shipName = new StringColumn();
    shipAddress = new StringColumn();
    shipCity = new StringColumn();
    shipRegion = new StringColumn();
    shipPostalCode = new StringColumn();
    shipCountry = new StringColumn();

    constructor() {
        super('Orders');
    }
}