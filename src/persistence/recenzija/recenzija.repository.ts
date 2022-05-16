import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { IRecenzijaRepository } from 'src/domain/recenzija/repository.interface';
import { Recenzija } from 'src/entities/Recenzija';
import { EntityModelMapper } from '../entity-model.mapper';

@Injectable()
export class RecenzijaRepository implements IRecenzijaRepository {
  private readonly repository: EntityRepository<Recenzija>;

  constructor(
    private readonly orm: MikroORM,
    private readonly mapper: EntityModelMapper,
  ) {
    this.repository = this.orm.em.getRepository(Recenzija);
  }

  async getAll(): Promise<RecenzijaModel[]> {
    const queryResult = await this.repository.findAll({
      populate: ['idKorisnik.idKorisnik', 'idObjekt'],
    });
    return queryResult.map((recenzija) => {
      return this.mapper.recenzijaE2M(recenzija);
    });
  }
}
