// /orders?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('Orders')
export class Orders extends EntityBase {
    @Field({ caption: 'OrderID' })
    id: number = 0;
    @Field()
    customerID: string = '';
    @Field()
    employeeID: number = 0;
    @DateOnlyField()
    orderDate?: Date;
    @DateOnlyField()
    requiredDate?: Date;
    @DateOnlyField()
    shippedDate?: Date;
    @Field()
    shipVia: number = 0;
    @Field()
    freight: number = 0;
    @Field()
    shipName: string = '';
    @Field()
    shipAddress: string = '';
    @Field()
    shipCity: string = '';
    @Field()
    shipRegion: string = '';
    @Field()
    shipPostalCode: string = '';
    @Field()
    shipCountry: string = '';
}
