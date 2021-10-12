// /Shippers?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('Shippers')
export class Shippers extends EntityBase {
    @Field({ caption: 'ShipperID' })
    id: number = 0;
    @Field()
    companyName: string = '';
    @Field()
    phone: string = '';
}
