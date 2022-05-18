import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Korisnik } from './Korisnik';
import { Recenzija } from './Recenzija';

@Entity()
export class Komentar {
  @PrimaryKey()
  idKomentar!: number;

  @Property({ length: 320 })
  tekst!: string;

  @Property({ columnType: 'date', nullable: true, defaultRaw: `now()` })
  datumStvaranja?: string;

  @Property({ nullable: true, default: false })
  uređeno?: boolean = false;

  @ManyToOne({
    entity: () => Korisnik,
    fieldName: 'id_korisnik',
    primary: true,
  })
  idKorisnik!: Korisnik; // Korisnik koji je ostavio komentar

  @ManyToOne({
    entity: () => Recenzija,
    fieldName: 'id_korisnik_recenzija',
    primary: true,
  })
  idKorisnikRecenzija!: Recenzija; // Korisnik koji je napravio recenziju

  @ManyToOne({
    entity: () => Recenzija,
    fieldName: 'id_korisnik_recenzija',
    primary: true,
  })
  idObjekt!: Recenzija; // Objekt za koji se odnosi recenzija
}
