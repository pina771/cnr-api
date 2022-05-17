import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateObjectDTO } from 'src/api/dtos/create-object.dto';
import { UpdateObjektDTO } from 'src/api/dtos/update-object.dto';
import { ObjektModel } from './objekt.model';
import { IObjektRepository } from './repository.interface';

const ObjektRepo = () => Inject('ObjektRepo');
@Injectable()
export class ObjektService {
  constructor(
    @ObjektRepo() private readonly objektRepository: IObjektRepository,
  ) {}

  async getAll(): Promise<ObjektModel[]> {
    const queryResult = await this.objektRepository.getAll();
    return queryResult;
  }

  async getSingle(sidObjekt: string): Promise<ObjektModel> {
    return await this.objektRepository.getSingle(sidObjekt);
  }

  async newObjekt(objekt: ObjektModel): Promise<any> {
    return await this.objektRepository.newObjekt(objekt);
  }

  async updateObjekt(
    vlasnik: string,
    sidObjekt: string,
    noviObjekt: UpdateObjektDTO,
  ): Promise<any> {
    const postojeciObjekt = await this.objektRepository.getSingle(sidObjekt);
    if (vlasnik !== postojeciObjekt.vlasnik.username)
      throw new UnauthorizedException('Niste upravitelj objekta');
    return await this.objektRepository.updateObjekt(
      postojeciObjekt,
      noviObjekt,
    );
  }
}
