import { MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateObjektDto } from 'src/api/dtos/create-object.dto';
import { UpdateObjektDTO } from 'src/api/dtos/update-object.dto';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { IObjektRepository } from 'src/domain/objekt/repository.interface';
import { Grad } from 'src/entities/Grad';
import { Korisnik } from 'src/entities/Korisnik';
import { Objekt } from 'src/entities/Objekt';
import { Pogodnost } from 'src/entities/Pogodnost';
import { Vrsta } from 'src/entities/Vrsta';
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
      populate: ['fotografije', 'pogodnosti'],
    });
    return result.map((objEntity) => {
      return this.mapper.objektE2M(objEntity);
    });
  }

  async getSingle(sidObjekt: string): Promise<ObjektModel> {
    const queryResult = await this.repository.findOne(
      { sid: sidObjekt },
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
    if (!queryResult) return null;
    return this.mapper.objektE2M(queryResult);
  }

  async newObjekt(objekt: CreateObjektDto): Promise<any> {
    const korisnik = await this.orm.em
      .getRepository(Korisnik)
      .findOne({ username: objekt.vlasnik });
    const grad = await this.orm.em
      .getRepository(Grad)
      .findOne({ naziv: objekt.grad });
    const vrsta = await this.orm.em
      .getRepository(Vrsta)
      .findOne({ kratica: objekt.vrsta });
    const objektEntity = this.repository.create({
      naziv: objekt.naziv,
      adresa: objekt.adresa,
      radnoVrijeme: objekt.radnoVrijeme,
      kontaktBroj: objekt.kontaktBroj,
      sid: objekt.sid,
      vlasnik: korisnik.ugostitelj,
      grad: grad,
      vrsta: vrsta,
    });
    objektEntity.sid = randomUUID();
    if (objekt.pogodnosti) {
      const pogodnostiEntity = await this.orm.em
        .getRepository(Pogodnost)
        .find({ naziv: objekt.pogodnosti });
      pogodnostiEntity.forEach((pe) => objektEntity.pogodnosti.add(pe));
    }

    await this.repository.persistAndFlush(objektEntity);
    return true;
  }

  /* Ažurira već postojeći objekt */
  async updateObjekt(
    postojeciObjekt: ObjektModel,
    noviObjekt: UpdateObjektDTO,
  ): Promise<ObjektModel> {
    // Entitet kojeg treba ažurirati
    const objektEntity = await this.repository.findOne({
      sid: postojeciObjekt.sid,
    });
    objektEntity.pogodnosti.loadItems();
    const { grad, vrsta, pogodnosti, ...ostatak } = noviObjekt;

    // ove koje nisu entiteti/reference mozemo jednostavno samo izmjeniti
    this.orm.em.assign(objektEntity, ostatak);

    // Ako je neko mijenjao grad (zašto uopće bi se to radilo... )
    // moramo pronaći entitet grada(grad je šifarnik pa uvik se radi već postojeći entitet)
    // i postaviti referencu na njega
    if (grad) {
      const gradEntity = await this.orm.em
        .getRepository(Grad)
        .findOne({ naziv: grad });
      objektEntity.grad = gradEntity;
    }
    // Isto vrijedi i za vrstu
    if (vrsta) {
      const vrstaEntity = await this.orm.em
        .getRepository(Vrsta)
        .findOne({ kratica: vrsta });
      objektEntity.vrsta = vrstaEntity;
    }

    // Za pogodnosti je situacija zafrkana, moramo ukloniti sve pogodnosti i
    // onda ponovo gledamo koje su odabrane u formi i trazimo te entitete
    objektEntity.pogodnosti.removeAll();
    if (pogodnosti) {
      const svePogodnosti = await this.orm.em
        .getRepository(Pogodnost)
        .findAll();
      svePogodnosti.forEach((pogodnost) => {
        if (pogodnosti.includes(pogodnost.naziv))
          objektEntity.pogodnosti.add(pogodnost);
      });
    }
    await this.repository.persistAndFlush(objektEntity);
    return this.mapper.objektE2M(objektEntity);
  }

  async deleteObjekt(sidObjekt: string): Promise<any> {
    const objEntity = await this.repository.findOne(
      { sid: sidObjekt },
      { populate: ['pogodnosti', 'fotografije', 'recenzije.komentari'] },
    );
    objEntity.pogodnosti.removeAll();
    objEntity.fotografije.removeAll();
    objEntity.recenzije.removeAll();
    this.repository.remove(objEntity).flush();
  }

  /* TODO: Dodavanje fotografija objektu */
}
