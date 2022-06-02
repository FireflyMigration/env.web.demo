// /products?_responseType=REMULT

import { Field,  Entity, EntityBase, Fields } from 'remult';

@Entity('Products')
export class Products extends EntityBase {
    @Fields.integer({ caption: 'ProductID' })
    id: number = 0;
    @Fields.string()
    productName: string = '';
    @Fields.integer()
    supplierID: number = 0;
    @Fields.integer()
    categoryID: number = 0;
    @Fields.string()
    quantityPerUnit: string = '';
    @Fields.integer()
    unitPrice: number = 0;
    @Fields.integer()
    unitsInStock: number = 0;
    @Fields.integer()
    unitsOnOrder: number = 0;
    @Fields.integer()
    reorderLevel: number = 0;
    @Fields.boolean()
    discontinued: boolean = false;
}
