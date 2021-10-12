// /Suppliers?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('Suppliers')
export class Suppliers extends EntityBase {
    @Field({ caption: 'SupplierID' })
    id: number = 0;
    @Field()
    companyName: string = '';
}
