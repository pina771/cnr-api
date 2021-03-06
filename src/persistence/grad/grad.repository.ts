import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { GradModel } from 'src/domain/grad/grad.model';
import { IGradRepository } from 'src/domain/grad/repository.interface';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { Grad } from 'src/entities/Grad';
import { EntityModelMapper } from '../entity-model.mapper';

@Injectable()
export class GradRepository implements IGradRepository {
  private readonly repository: EntityRepository<Grad>;

  constructor(
    private readonly orm: MikroORM,
    private readonly mapper: EntityModelMapper,
  ) {
    this.repository = this.orm.em.getRepository(Grad);
  }

  async getAll(): Promise<GradModel[]> {
    const queryResult = await this.repository.findAll();
    return queryResult.map((gradEntity) => this.mapper.gradE2M(gradEntity));
  }

  async getAllObjektFromGrad(nazivGrada: string): Promise<ObjektModel[]> {
    const queryResult = await this.repository.findOne(
      { naziv: nazivGrada },
      {
        populate: [
          'objekti.vrsta',
          'objekti.pogodnosti',
          'objekti.fotografije',
          'objekti.vrsta',
        ],
      },
    );
    if (queryResult.objekti.isInitialized()) {
      return queryResult.objekti.getItems().map((obj) => {
        return this.mapper.objektE2M(obj);
      });
    }
    return null;
  }
}
