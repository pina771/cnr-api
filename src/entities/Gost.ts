import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
} from '@mikro-orm/core';
import { Korisnik } from './Korisnik';
import { Recenzija } from './Recenzija';

@Entity()
export class Gost {
  @OneToOne({
    entity: () => Korisnik,
    fieldName: 'id_korisnik',
    onDelete: 'cascade',
    primary: true,
    cascade: [Cascade.PERSIST],
    inversedBy: 'gost',
  })
  idKorisnik!: Korisnik;

  @OneToMany({
    entity: () => Recenzija,
    mappedBy: 'idKorisnik',
  })
  recenzije?: Collection<Recenzija>;
}
