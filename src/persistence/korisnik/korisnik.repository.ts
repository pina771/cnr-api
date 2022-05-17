import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/api/dtos/register.dto';
import { KorisnikModel } from 'src/domain/Korisnik/korisnik.model';
import { IKorisnikRepository } from 'src/domain/korisnik/repository.interface';
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
    const result = await this.repository.findOneOrFail(
      { username: username },
      { populate: ['gost.recenzije.idObjekt', 'ugostitelj.objekti'] },
    );
    if (result.uloga == 'gost') {
      return this.mapper.gostE2M(result.gost);
    } else if (result.uloga == 'ugostitelj') {
      return this.mapper.ugostiteljE2M(result.ugostitelj);
    }
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
}
