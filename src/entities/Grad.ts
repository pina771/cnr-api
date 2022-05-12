import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Grad {
  @PrimaryKey({ length: 30 })
  naziv!: string;

  @Property()
  postanskiBroj!: number;
}
