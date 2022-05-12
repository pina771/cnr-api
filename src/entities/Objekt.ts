import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Grad } from './Grad';
import { Ugostitelj } from './Ugostitelj';
import { Vrsta } from './Vrsta';

@Entity()
export class Objekt {
  @PrimaryKey({ name: 'id_objekt' })
  id!: number;

  @Property({ length: 30 })
  naziv!: string;

  @Property({ length: 50 })
  adresa!: string;

  @Property({ name: 'radno_vrijeme', length: 30, nullable: true })
  radnoVrijeme?: string;

  @Property({ name: 'kontakt_broj', length: 15 })
  kontaktBroj!: string;

  @Property({
    name: 'datum_stvaranja',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
  })
  datumStvaranja?: Date;

  @Property({ nullable: true, default: false })
  potvrden?: boolean = false;

  @ManyToOne({ entity: () => Ugostitelj, fieldName: 'id_korisnik' })
  vlasnik!: Ugostitelj;

  @ManyToOne({ entity: () => Grad })
  grad!: Grad;

  @ManyToOne({ entity: () => Vrsta, fieldName: 'kratica' })
  vrsta!: Vrsta;
}
