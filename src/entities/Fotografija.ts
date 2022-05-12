import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Objekt } from './Objekt';

@Entity()
export class Fotografija {

  @PrimaryKey()
  id!: number;

  @Property({ length: 255 })
  url!: string;

  @ManyToOne({ entity: () => Objekt, fieldName: 'id_objekt', primary: true })
  idObjekt!: Objekt;

}
