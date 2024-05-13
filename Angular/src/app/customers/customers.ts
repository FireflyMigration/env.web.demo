// /customers?_responseType=REMULT

import { Fields, Entity, EntityBase } from 'remult';

@Entity('Customers')
export class Customers extends EntityBase {
    @Fields.string({ caption: 'CustomerID' })
    id: string = '';
    @Fields.string()
    companyName: string = '';
    @Fields.string()
    contactName: string = '';
    @Fields.string()
    contactTitle: string = '';
    @Fields.string()
    address: string = '';
    @Fields.string()
    city: string = '';
    @Fields.string()
    region: string = '';
    @Fields.string()
    postalCode: string = '';
    @Fields.string()
    country: string = '';
    @Fields.string()
    phone: string = '';
    @Fields.string()
    fax: string = '';
}
