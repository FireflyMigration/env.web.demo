// /customers?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('Customers')
export class Customers extends EntityBase {
    @Field({ caption: 'CustomerID' })
    id: string = '';
    @Field()
    companyName: string = '';
    @Field()
    contactName: string = '';
    @Field()
    contactTitle: string = '';
    @Field()
    address: string = '';
    @Field()
    city: string = '';
    @Field()
    region: string = '';
    @Field()
    postalCode: string = '';
    @Field()
    country: string = '';
    @Field()
    phone: string = '';
    @Field()
    fax: string = '';
}
