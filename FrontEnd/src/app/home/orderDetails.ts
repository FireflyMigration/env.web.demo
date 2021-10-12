// /orderDetails?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('OrderDetails')
export class OrderDetails extends EntityBase {
    @Field()
    orderID: number = 0;
    @Field()
    productID: number = 0;
    @Field()
    unitPrice: number = 0;
    @Field()
    quantity: number = 0;
    @Field()
    discount: number = 0;
    @Field()
    id: string = '';
}
