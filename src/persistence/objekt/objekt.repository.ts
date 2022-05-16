import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { IObjektRepository } from 'src/domain/objekt/repository.interface';
import { Objekt } from 'src/entities/Objekt';
import { EntityModelMapper } from '../entity-model.mapper';

@Injectable()
export class ObjektRepository implements IObjektRepository {
  private readonly repository: EntityRepository<Objekt>;

  constructor(
    private readonly orm: MikroORM,
    private readonly mapper: EntityModelMapper,
  ) {
    this.repository = this.orm.em.getRepository(Objekt);
  }

  async getAll(): Promise<any[]> {
    const result = await this.repository.findAll({
      populate: ['fotografije', 'pogodnosti', 'vlasnik.idKorisnik'],
    });
    return result.map((objEntity) => {
      return this.mapper.objektE2M(objEntity);
    });
  }

  async getSingle(idObjekt: number): Promise<ObjektModel> {
    const queryResult = await this.repository.findOne(
      { id: idObjekt },
      {
        populate: [
          'vlasnik.idKorisnik',
          'fotografije',
          'pogodnosti',
          'vrsta',
          'recenzije.idKorisnik.idKorisnik',
        ],
      },
    );
    return this.mapper.objektE2M(queryResult);
  }
}
