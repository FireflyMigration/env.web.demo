// /Shippers?_responseType=REMULT

import { Field,  Entity, EntityBase, Fields } from 'remult';

@Entity('Shippers')
export class Shippers extends EntityBase {
    @Fields.integer({ caption: 'ShipperID' })
    id: number = 0;
    @Fields.string()
    companyName: string = '';
    @Fields.string()
    phone: string = '';
}
