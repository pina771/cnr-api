import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Korisnik } from './Korisnik';
import { Objekt } from './Objekt';

@Entity()
export class Ugostitelj {
  @Property({ length: 15, nullable: true })
  kontaktBroj?: string;

  @OneToOne({
    entity: () => Korisnik,
    fieldName: 'id_korisnik',
    onDelete: 'cascade',
    primary: true,
  })
  idKorisnik!: Korisnik;

  @OneToMany({
    entity: () => Objekt,
    mappedBy: 'vlasnik',
  })
  objekti: Collection<Objekt>;
}
