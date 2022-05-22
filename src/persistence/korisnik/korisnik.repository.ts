import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { KorisnikModel } from 'src/domain/Korisnik/korisnik.model';
import { IKorisnikRepository } from 'src/domain/korisnik/repository.interface';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { Gost } from 'src/entities/Gost';
import { Korisnik } from 'src/entities/Korisnik';
import { Ugostitelj } from 'src/entities/Ugostitelj';
import { EntityModelMapper } from '../entity-model.mapper';

/* Konkretna implementacija IKorisnikRepository za Mikro-ORM */
/* Ne pretvaramo KorisnikEntity -> KorisnikModel jer držimo identične podatke, vraćamo efektivno isti objekt */
@Injectable()
export class KorisnikRepository implements IKorisnikRepository {
  private readonly repository: EntityRepository<Korisnik>;
  private readonly gostRepo: EntityRepository<Gost>;

  constructor(
    private readonly orm: MikroORM,
    private readonly mapper: EntityModelMapper,
  ) {
    this.repository = this.orm.em.getRepository(Korisnik);
  }

  async getAll(): Promise<KorisnikModel[]> {
    const queryResult = await this.repository.findAll();
    return queryResult.map((korisnikEntity) =>
      this.mapper.korisnikE2M(korisnikEntity),
    );
  }

  async getSingle(username: string): Promise<KorisnikModel> {
    const result = await this.repository.findOne({ username: username });
    if (!result) return null;

    return this.mapper.korisnikE2M(result);
  }

  async newKorisnik(korisnik: KorisnikModel): Promise<boolean> {
    const entity = this.repository.create(korisnik);
    if (entity.uloga == 'ugostitelj') {
      const ugostitelj = this.orm.em
        .getRepository(Ugostitelj)
        .create({ idKorisnik: entity });
      await this.orm.em.getRepository(Ugostitelj).persistAndFlush(ugostitelj);
    } else if (entity.uloga == 'gost') {
      const gost = this.orm.em
        .getRepository(Gost)
        .create({ idKorisnik: entity });
      await this.orm.em.getRepository(Gost).persistAndFlush(gost);
    }
    return true;
  }

  async getAllObjektFromKorisnik(username: string): Promise<ObjektModel[]> {
    const ugostitelj = (
      await this.repository.findOne(
        { username: username },
        { populate: ['ugostitelj.objekti'] },
      )
    ).ugostitelj;
    const objekti = await ugostitelj.objekti.loadItems();
    return objekti.map((objEntity) => this.mapper.objektE2M(objEntity));
  }

  async getAllRecenzijaFromKorisnik(
    username: string,
  ): Promise<RecenzijaModel[]> {
    const gost = (
      await this.repository.findOne(
        {
          username: username,
        },
        { populate: ['gost.recenzije.idObjekt'] },
      )
    ).gost;
    const recenzije = gost.recenzije.loadItems();
    return (await recenzije).map((recEntity) =>
      this.mapper.recenzijaE2M(recEntity, gost),
    );
  }
}
