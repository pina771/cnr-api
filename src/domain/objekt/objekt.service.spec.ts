import { Test, TestingModule } from '@nestjs/testing';
import { CreateObjektDto } from 'src/api/dtos/create-object.dto';
import { ObjektController } from 'src/api/objekt.controller';
import { Objekt } from 'src/entities/Objekt';
import { mock_obj_dto, mock_objekti } from 'src/mocks/services/mock-data';
import { ObjektModel } from './objekt.model';
import { ObjektService } from './objekt.service';

describe('ObjektService - UNIT', () => {
  let service: ObjektService;
  let repo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjektService,
        {
          provide: 'ObjektRepo',
          useValue: {
            getAll: jest.fn(() => mock_objekti),
            getSingle: jest.fn((sid) => mock_objekti[0]),
            newObjekt: jest.fn((createDto: CreateObjektDto) => true),
          },
        },
      ],
    }).compile();

    service = module.get(ObjektService);
    repo = module.get('ObjektRepo');
  });

  it('Dohvat svih objekata. Treba proslijediti metodu u repozitorij', async () => {
    await service.getAll();
    expect(repo.getAll).toBeCalled();
  });

  it('Dohvat jednog objekta na temelju SID-a. Treba proslijediti u repozitorij', async () => {
    const result = await service.getSingle('o1-sid');
    expect(repo.getSingle).toBeCalled();
    expect(result).toBeInstanceOf(ObjektModel);
  });

  it('Stvaranje novog objekta. Treba proslijediti u repozitorij', async () => {
    await service.newObjekt(mock_obj_dto);
    expect(repo.newObjekt).toBeCalled();
  });

  it('Ažuriranje već postojećeg objekta. Treba pozvati getSingle i updateObjekt metode repozitorija', async () => {
    // TODO:
  });
});
