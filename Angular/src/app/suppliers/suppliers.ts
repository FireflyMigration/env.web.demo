// /Suppliers?_responseType=REMULT

import { Fields, Entity, EntityBase } from 'remult';

@Entity('Suppliers')
export class Suppliers extends EntityBase {
    @Fields.integer({ caption: 'SupplierID' })
    id: number = 0;
    @Fields.string()
    companyName: string = '';
}
