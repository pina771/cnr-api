import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Objekt } from './Objekt';

@Entity()
export class Grad {
  @PrimaryKey({ length: 30 })
  naziv!: string;

  @Property()
  postanskiBroj!: number;

  @OneToMany({ entity: () => Objekt, mappedBy: 'grad' })
  objekti: Objekt[];
}
