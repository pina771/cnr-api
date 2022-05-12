import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/api/dtos/register.dto';
import { KorisnikModel } from 'src/domain/Korisnik/korisnik.model';
import { IKorisnikRepository } from 'src/domain/korisnik/repository.interface';
import { Korisnik } from 'src/entities/Korisnik';

/* Konkretna implementacija IKorisnikRepository za Mikro-ORM */
/* Ne pretvaramo KorisnikEntity -> KorisnikModel jer držimo identične podatke, vraćamo efektivno isti objekt */
@Injectable()
export class KorisnikRepository implements IKorisnikRepository {
  private readonly repository: EntityRepository<Korisnik>;

  constructor(private readonly orm: MikroORM) {
    this.repository = this.orm.em.getRepository(Korisnik);
  }

  async getAll(): Promise<KorisnikModel[]> {
    return await this.repository.findAll();
  }

  async getSingle(requestedId: number): Promise<KorisnikModel> {
    const result = await this.repository.findOneOrFail({ id: requestedId });
    return result;
  }

  async getByUsername(username: string): Promise<KorisnikModel | null> {
    const result = await this.repository.findOne({ username: username });
    if (result) return result;
    return null;
  }

  async newKorisnik(registerDto: RegisterDTO): Promise<boolean> {
    const entity = await this.repository.create(registerDto);
    if (this.repository.find(entity)) {
      return false;
    }
    await this.repository.persistAndFlush(entity);
    if (entity) return true;
    return false;
  }
}
