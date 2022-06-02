// /orderDetails?_responseType=REMULT

import { Fields, Entity, EntityBase } from 'remult';

@Entity('OrderDetails')
export class OrderDetails extends EntityBase {
    @Fields.integer()
    orderID: number = 0;
    @Fields.integer()
    productID: number = 0;
    @Fields.number()
    unitPrice: number = 0;
    @Fields.number()
    quantity: number = 0;
    @Fields.number()
    discount: number = 0;
    @Fields.string()
    id: string = '';
}
