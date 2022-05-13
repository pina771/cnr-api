import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { IObjektRepository } from 'src/domain/objekt/repository.interface';
import { Objekt } from 'src/entities/Objekt';

@Injectable()
export class ObjektRepository implements IObjektRepository {
  private readonly repository: EntityRepository<Objekt>;

  constructor(private readonly orm: MikroORM) {
    this.repository = this.orm.em.getRepository(Objekt);
  }
  async getAll(): Promise<ObjektModel[]> {
    return await this.repository.findAll({
      populate: ['fotografije', 'pogodnosti'],
    });
  }

  // NOTE: Ovdje treba definirati DTO za povrat koji ima
  // objekt, fotografije, pogodnosti itd
  async getSingleObjekt(): Promise<any> {
    return null;
  }
}
