// /products?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('Products')
export class Products extends EntityBase {
    @Field({ caption: 'ProductID' })
    id: number = 0;
    @Field()
    productName: string = '';
    @Field()
    supplierID: number = 0;
    @Field()
    categoryID: number = 0;
    @Field()
    quantityPerUnit: string = '';
    @Field()
    unitPrice: number = 0;
    @Field()
    unitsInStock: number = 0;
    @Field()
    unitsOnOrder: number = 0;
    @Field()
    reorderLevel: number = 0;
    @Field()
    discontinued: boolean = false;
}
