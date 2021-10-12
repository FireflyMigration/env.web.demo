// /Categories?_responseType=REMULT

import { Field, DateOnlyField, Entity, EntityBase } from 'remult';

@Entity('Categories')
export class Categories extends EntityBase {
    @Field({ caption: 'CategoryID' })
    id: number = 0;
    @Field()
    categoryName: string = '';
    @Field()
    description: string = '';
}
