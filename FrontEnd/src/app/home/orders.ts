import { Fields, Entity, EntityBase } from 'remult';

@Entity('Orders')
export class Orders extends EntityBase {
    @Fields.integer({ caption: 'OrderID' })
    id = 0;
    @Fields.string()
    customerID = '';
    @Fields.integer()
    employeeID = 0;
    @Fields.dateOnly()
    orderDate!: Date;
    @Fields.dateOnly()
    requiredDate!: Date;
    @Fields.dateOnly()
    shippedDate!: Date;
    @Fields.integer()
    shipVia = 0;
    @Fields.number()
    freight = 0;
    @Fields.string()
    shipName = '';
    @Fields.string()
    shipAddress = '';
    @Fields.string()
    shipCity = '';
    @Fields.string()
    shipRegion = '';
    @Fields.string()
    shipPostalCode = '';
    @Fields.string()
    shipCountry = '';
}