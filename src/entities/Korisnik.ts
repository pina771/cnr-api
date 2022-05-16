import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Gost } from './Gost';
import { Ugostitelj } from './Ugostitelj';

@Entity()
export class Korisnik {
  /* Autoinkrement je automatski postavljen! */
  @PrimaryKey({ name: 'id_korisnik' })
  id!: number;

  @Property({ length: 30 })
  username!: string;

  @Property({ length: 30 })
  ime!: string;

  @Property({ length: 30 })
  prezime!: string;

  @Property({ length: 255 })
  pwd!: string;

  @Property({ length: 130 })
  email!: string;

  @Property({ length: 15 })
  uloga!: string;

  @OneToOne({ entity: () => Gost, mappedBy: 'idKorisnik' })
  gost?: Gost;

  @OneToOne({ entity: () => Ugostitelj, mappedBy: 'idKorisnik' })
  ugostitelj?: Ugostitelj;
}
