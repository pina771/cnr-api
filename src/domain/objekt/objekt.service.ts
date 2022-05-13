import { Inject, Injectable } from '@nestjs/common';
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
}
