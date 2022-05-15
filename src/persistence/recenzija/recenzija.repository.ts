import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { IRecenzijaRepository } from 'src/domain/recenzija/repository.interface';
import { Recenzija } from 'src/entities/Recenzija';

@Injectable()
export class RecenzijaRepository implements IRecenzijaRepository {
  private readonly repository: EntityRepository<Recenzija>;

  constructor(private readonly orm: MikroORM) {
    this.repository = this.orm.em.getRepository(Recenzija);
  }

  async getAll(): Promise<RecenzijaModel[]> {
    const queryResult = await this.repository.findAll({
      populate: ['idObjekt', 'idKorisnik.idKorisnik'],
    });
    return null;
  }
}
