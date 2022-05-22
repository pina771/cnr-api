import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GradService } from 'src/domain/grad/grad.service';
import { ObjektService } from 'src/domain/objekt/objekt.service';
import { RecenzijaService } from 'src/domain/recenzija/recenzija.service';
import { MockGradService } from 'src/mocks/services/mock-grad.service';
import { MockObjektService } from 'src/mocks/services/mock-object.service';
import { MockRecenzijaService } from 'src/mocks/services/mock-recenzija.service';

import { DetailedObjektDTO } from '../dtos/objekt/detailed-object.dto';
import { GeneralObjektDTO } from '../dtos/objekt/general-object.dto';
import { ObjektController } from '../objekt.controller';

describe('ObjektController - UNIT', () => {
  let controller: ObjektController;

  /* Postavljamo prije svakog testa modul za testiranje  */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjektController],
      providers: [
        { provide: ObjektService, useClass: MockObjektService },
        { provide: GradService, useClass: MockGradService },
        { provide: RecenzijaService, useClass: MockRecenzijaService },
      ],
    })
      .overrideProvider(ObjektService)
      .useClass(MockObjektService)
      .overrideProvider(GradService)
      .useClass(MockGradService)
      .overrideProvider(RecenzijaService)
      .useClass(MockRecenzijaService)
      .compile();
    controller = module.get<ObjektController>(ObjektController);
  });

  it('Dohvaća polje General-Object DTOs', async () => {
    const spy = jest.spyOn(MockObjektService.prototype, 'getAll');
    const retval = await controller.getAll(null);
    expect(spy).toHaveBeenCalled();
    retval.forEach((val) => expect(val).toBeInstanceOf(GeneralObjektDTO));
  });

  it('Treba pozvati GradService ako je pružen Query', async () => {
    const spy = jest.spyOn(MockGradService.prototype, 'getAllObjektFromGrad');
    const retval = await controller.getAll('Split');
    expect(spy).toHaveBeenCalled();
    expect(Array.isArray(retval)).toBe(true);
    retval.forEach((val) => {
      expect.objectContaining({
        grad: expect.stringMatching('Split'),
      });
      expect(val).toBeInstanceOf(GeneralObjektDTO);
    });
  });

  it('Dohvaća jedan Detailed-Object DTO', async () => {
    const spy = jest.spyOn(MockObjektService.prototype, 'getSingle');
    const retval = await controller.getSingle('o1-sid');
    expect(spy).toHaveBeenCalled();
    expect(retval).toBeInstanceOf(DetailedObjektDTO);
  });

  it('Stvara novi objekt. Poziva ObjektService.newObjekt', async () => {
    const spy = jest.spyOn(MockObjektService.prototype, 'newObjekt');
    const req = { user: { uloga: 'ugostitelj' } };
    await controller.newObjekt(req, {
      naziv: 'NoviObj',
      adresa: 'NovaAdr',
      kontaktBroj: 'novikbr',
      vlasnik: 'k-username',
      grad: 'noviGrad',
      vrsta: 'night club',
      fotografije: [],
    });
    expect(spy).toHaveBeenCalled();
  });

  it('Prilikom stvaranja novog objekta baca Unauthorized Exception ako uloga!=ugostitelj', async () => {
    const req = { user: { uloga: 'gost' } };
    try {
      await controller.newObjekt(req, {
        naziv: 'NoviObj',
        adresa: 'NovaAdr',
        kontaktBroj: 'novikbr',
        vlasnik: 'k-username',
        grad: 'noviGrad',
        vrsta: 'night club',
        fotografije: [],
      });
    } catch (e: any) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('Prilikom brisanja objekta, baca UnauthorizedException ako korisnik nije vlasnik', async () => {
    const req = { user: { uloga: 'gost' } };
    try {
      await controller.deleteObjekt(req, '01-sid');
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
  it('Brisanje poziva ObjektService', async () => {
    const req = { user: { uloga: 'ugostitelj', username: 'test' } };
    const spy = jest.spyOn(MockObjektService.prototype, 'deleteObjekt');
    try {
      await controller.deleteObjekt(req, '01-sid');
    } catch (e) {}
    expect(spy).toHaveBeenCalled();
  });
});
