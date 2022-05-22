import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Vrsta {
  @PrimaryKey({ length: 20 })
  kratica!: string;

  @Property({ length: 320 })
  opis!: string;
}
