import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Gost } from './Gost';
import { Objekt } from './Objekt';

@Entity()
export class Recenzija {
  @ManyToOne({ entity: () => Gost, fieldName: 'id_korisnik', primary: true })
  idKorisnik!: Gost;

  @ManyToOne({ entity: () => Objekt, fieldName: 'id_objekt', primary: true })
  idObjekt!: Objekt;

  @Property({ nullable: true, default: false })
  uređeno?: boolean = false;

  @Property({ columnType: 'date', defaultRaw: `now()` })
  datumStvaranja!: Date;

  @Property({ length: 1000 })
  tekst!: string;

  @Property({ length: 100 })
  naslov!: string;
}
