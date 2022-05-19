import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { IKomentarRepository } from 'src/domain/komentar/repository.interface';
import { Komentar } from 'src/entities/Komentar';
import { EntityModelMapper } from '../entity-model.mapper';

@Injectable()
export class KomentarRepository implements IKomentarRepository {
  private readonly repository: EntityRepository<Komentar>;

  constructor(
    private readonly orm: MikroORM,
    private readonly mapper: EntityModelMapper,
  ) {
    this.repository = this.orm.em.getRepository(Komentar);
  }

  async updateKomentar(idKomentar: number, tekst: string): Promise<any> {
    const komentar = await this.repository.findOne({ idKomentar: idKomentar });
    komentar.tekst = tekst;
    this.repository.persistAndFlush(komentar);
  }

  async deleteKomentar(idKomentar: number): Promise<any> {
    const komentar = await this.repository.findOne({ idKomentar: idKomentar });
    this.repository.removeAndFlush(komentar);
  }
}
