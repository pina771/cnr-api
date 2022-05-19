import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Gost } from './Gost';
import { Komentar } from './Komentar';
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

  @OneToMany({
    entity: () => Komentar,
    mappedBy: (komentar) => komentar.recenzija,
  })
  komentari?: Collection<Komentar>;
}
