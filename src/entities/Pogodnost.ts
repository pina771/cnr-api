import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Objekt } from './Objekt';

@Entity()
export class Pogodnost {
  @PrimaryKey({ length: 30 })
  naziv!: string;

  @Property({ length: 320 })
  opis!: string;

  @ManyToMany({
    entity: () => Objekt,
    mappedBy: 'pogodnosti',
    pivotTable: 'sadrzi_pogodnost',
  })
  objekti = new Collection<Objekt>(this);
}
