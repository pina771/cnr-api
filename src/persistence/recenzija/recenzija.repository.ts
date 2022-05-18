import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateRecenzijaDTO } from 'src/api/dtos/recenzija/create-recenzija.dto';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { IRecenzijaRepository } from 'src/domain/recenzija/repository.interface';
import { Gost } from 'src/entities/Gost';
import { Korisnik } from 'src/entities/Korisnik';
import { Objekt } from 'src/entities/Objekt';
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

  async getSingle(
    objektSid: string,
    username: string,
  ): Promise<RecenzijaModel> {
    const gost = (
      await this.orm.em.getRepository(Korisnik).findOne({ username: username })
    ).gost;
    const objekt = await this.orm.em
      .getRepository(Objekt)
      .findOne({ sid: objektSid });
    const recEntity = await this.repository.findOne(
      {
        idKorisnik: gost,
        idObjekt: objekt,
      },
      { populate: ['idObjekt'] },
    );
    return this.mapper.recenzijaE2M(recEntity);
  }

  async newRecenzija(
    objektSid: string,
    recenzijaInfo: CreateRecenzijaDTO,
    username: string,
  ): Promise<any> {
    const objekt = await this.orm.em.findOne(Objekt, { sid: objektSid });
    const korisnik = (
      await this.orm.em.findOne(Korisnik, { username: username })
    ).gost;
    const recenzija = this.repository.create({
      tekst: recenzijaInfo.tekst,
      naslov: recenzijaInfo.naslov,
      idObjekt: objekt,
      idKorisnik: korisnik,
    });
    this.repository.persistAndFlush(recenzija);

    return;
  }

  async updateRecenzija(
    objektSid: string,
    recenzijaInfo: CreateRecenzijaDTO,
    username: string,
  ): Promise<any> {
    const objekt = await this.orm.em.findOne(Objekt, { sid: objektSid });
    const korisnik = (
      await this.orm.em.findOne(Korisnik, { username: username })
    ).gost;
    const recenzija = await this.repository.findOne({
      idObjekt: objekt,
      idKorisnik: korisnik,
    });
    recenzija.uređeno = true;
    recenzija.naslov = recenzijaInfo.naslov;
    recenzija.tekst = recenzijaInfo.tekst;
    return await this.repository.persistAndFlush(recenzija);
  }

  async deleteRecenzija(objektSid: string, username: string): Promise<any> {
    const objekt = await this.orm.em.findOne(Objekt, { sid: objektSid });
    const korisnik = (
      await this.orm.em.findOne(Korisnik, { username: username })
    ).gost;
    const recenzija = await this.repository.findOne({
      idObjekt: objekt,
      idKorisnik: korisnik,
    });
    console.log('Deleting!');
    this.repository.removeAndFlush(recenzija);
    return;
  }
}
