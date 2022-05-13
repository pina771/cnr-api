import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { GradModel } from 'src/domain/grad/grad.model';
import { IGradRepository } from 'src/domain/grad/repository.interface';
import { Grad } from 'src/entities/Grad';

@Injectable()
export class GradRepository implements IGradRepository {
  private readonly repository: EntityRepository<Grad>;

  constructor(private readonly orm: MikroORM) {
    this.repository = this.orm.em.getRepository(Grad);
  }
  async getAll(): Promise<GradModel[]> {
    return await this.repository.findAll();
  }
}
