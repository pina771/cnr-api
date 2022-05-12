import { Entity, OneToOne } from '@mikro-orm/core';
import { Korisnik } from './Korisnik';

@Entity()
export class Administrator {
  @OneToOne({
    entity: () => Korisnik,
    fieldName: 'id_korisnik',
    onDelete: 'cascade',
    primary: true,
  })
  idKorisnik!: Korisnik;
}
