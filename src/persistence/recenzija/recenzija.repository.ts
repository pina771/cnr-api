import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateRecenzijaDTO } from 'src/api/dtos/recenzija/create-recenzija.dto';
import { KomentarModel } from 'src/domain/komentar/komentar.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { IRecenzijaRepository } from 'src/domain/recenzija/repository.interface';
import { Komentar } from 'src/entities/Komentar';
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

  async getAllFromObjekt(objektSid: string): Promise<RecenzijaModel[]> {
    const objekt = await this.orm.em.findOne(
      Objekt,
      { sid: objektSid },
      { populate: ['recenzije.idKorisnik.idKorisnik'] },
    );
    const recenzije = objekt.recenzije.getItems();
    return recenzije.map((recEntity) => this.mapper.recenzijaE2M(recEntity));
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
    if (!recEntity) return null;
    return this.mapper.recenzijaE2M(recEntity);
  }

  /* Ispravno */
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

  /* Ispravno */
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

  /* Ispravno */
  async deleteRecenzija(objektSid: string, username: string): Promise<any> {
    const objekt = await this.orm.em.findOne(Objekt, { sid: objektSid });
    const korisnik = (
      await this.orm.em.findOne(Korisnik, { username: username })
    ).gost;
    const recenzija = await this.repository.findOne(
      {
        idObjekt: objekt,
        idKorisnik: korisnik,
      },
      { populate: ['komentari'] },
    );
    recenzija.komentari
      .getItems()
      .forEach(async (komentar) => await this.orm.em.removeAndFlush(komentar));
    this.repository.removeAndFlush(recenzija);

    return;
  }

  /* KOMENTARI ********************************************** */

  async getAllKomentarFromRecenzija(
    objektSid: string,
    username: string,
  ): Promise<KomentarModel[]> {
    const gost = (await this.orm.em.findOne(Korisnik, { username: username }))
      .gost;
    const objekt = await this.orm.em.findOne(Objekt, { sid: objektSid });

    const recenzija = await this.repository.findOne(
      { idKorisnik: gost, idObjekt: objekt },
      { populate: ['komentari.idKorisnik'] },
    );
    return recenzija.komentari
      .getItems()
      .map((komEntity) => this.mapper.komentarE2M(komEntity, recenzija));
  }

  async newKomentarToRecenzija(
    recenzija: { objSid: string; username: string },
    komentar: { username: string; tekst: string },
  ): Promise<any> {
    // Dohvat recenzije
    const recenzijaKorisnik = (
      await this.orm.em.findOne(Korisnik, {
        username: recenzija.username,
      })
    ).gost;
    const komentarKorisnik = await this.orm.em.findOne(Korisnik, {
      username: komentar.username,
    });
    const objekt = await this.orm.em.findOne(Objekt, { sid: recenzija.objSid });
    const recEntity = await this.repository.findOne(
      {
        idKorisnik: recenzijaKorisnik,
        idObjekt: objekt,
      },
      { populate: ['komentari.idKorisnik'] },
    );
    const noviKomentar = this.orm.em.create(Komentar, {
      tekst: komentar.tekst,
      idKorisnik: komentarKorisnik,
      recenzija: recEntity,
    });
    await this.orm.em.persistAndFlush(noviKomentar);
    return;
  }

  async updateKomentarToRecenzija(komentar: {
    idKomentar: number;
    tekst: string;
  }): Promise<any> {
    const komentarEntity = await this.orm.em.findOne(Komentar, {
      idKomentar: komentar.idKomentar,
    });
    komentarEntity.tekst = komentar.tekst;
    komentarEntity.uređeno = true;
    await this.orm.em.persistAndFlush(komentarEntity);
    return;
  }
}
