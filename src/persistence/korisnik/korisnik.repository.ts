import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/api/dtos/register.dto';
import { KorisnikModel } from 'src/domain/Korisnik/korisnik.model';
import { IKorisnikRepository } from 'src/domain/korisnik/repository.interface';
import { Gost } from 'src/entities/Gost';
import { Korisnik } from 'src/entities/Korisnik';
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

  async getSingle(requestedId: number): Promise<KorisnikModel> {
    const result = await this.repository.findOneOrFail(
      { id: requestedId },
      { populate: ['gost.recenzije.idObjekt'] },
    );
    if ((result.uloga = 'gost')) {
      return this.mapper.gostE2M(result.gost);
    }
    return this.mapper.korisnikE2M(result);
  }

  async getByUsername(username: string): Promise<KorisnikModel | null> {
    const result = await this.repository.findOne({ username: username });
    if (result) return result;
    return null;
  }

  async newKorisnik(registerDto: RegisterDTO): Promise<boolean> {
    const entity = await this.repository.create(registerDto);
    if (await this.repository.findOne({ username: entity.username })) {
      return false;
    }
    await this.repository.persistAndFlush(entity);
    if (entity) return true;
    return false;
  }
}
