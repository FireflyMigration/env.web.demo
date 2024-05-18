// /customers?_responseType=REMULT

import { Fields, Entity, EntityBase } from 'remult';

@Entity('Customers')
export class Customers extends EntityBase {
    @Fields.string({ caption: 'CustomerID' })
    id = '';
    @Fields.string()
    companyName = '';
    @Fields.string()
    contactName = '';
    @Fields.string()
    contactTitle = '';
    @Fields.string()
    address = '';
    @Fields.string()
    city = '';
    @Fields.string()
    region = '';
    @Fields.string()
    postalCode = '';
    @Fields.string()
    country = '';
    @Fields.string()
    phone = '';
    @Fields.string()
    fax = '';
}
