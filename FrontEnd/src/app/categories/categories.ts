// /Categories?_responseType=REMULT

import { Fields, Entity, EntityBase } from 'remult';

@Entity('Categories')
export class Categories extends EntityBase {
    @Fields.integer({ caption: 'CategoryID' })
    id: number = 0;
    @Fields.string()
    categoryName: string = '';
    @Fields.string()
    description: string = '';
}
