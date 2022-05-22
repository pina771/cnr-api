import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Gost } from './Gost';
import { Recenzija } from './Recenzija';

@Entity()
export class Glas {
  @ManyToOne({ entity: () => Gost, fieldName: 'id_korisnik', primary: true })
  idKorisnik!: Gost;

  @ManyToOne({
    entity: () => Recenzija,
    fieldName: 'id_korisnik_recenzija',
    primary: true,
  })
  idKorisnikRecenzija!: Recenzija;

  @ManyToOne({
    entity: () => Recenzija,
    fieldName: 'id_korisnik_recenzija',
    primary: true,
  })
  idObjekt!: Recenzija;

  @Property()
  vrijednost!: number;
}
