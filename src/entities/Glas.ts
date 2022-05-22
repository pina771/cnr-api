import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Gost } from './Gost';
import { Recenzija } from './Recenzija';

@Entity()
export class Glas {
  @ManyToOne({ entity: () => Gost, fieldName: 'id_korisnik', primary: true })
  idKorisnik!: Gost;

  @Property()
  vrijednost!: number;
}
