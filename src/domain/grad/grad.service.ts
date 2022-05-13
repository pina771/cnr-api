import { Inject, Injectable } from '@nestjs/common';
import { ObjektModel } from '../objekt/objekt.model';
import { GradModel } from './grad.model';
import { IGradRepository } from './repository.interface';

const GradRepo = () => Inject('GradRepo');

@Injectable()
export class GradService {
  constructor(@GradRepo() private readonly gradRepository: IGradRepository) {}

  async getAll(): Promise<GradModel[]> {
    return this.gradRepository.getAll();
  }

  async getAllObjektFromGrad(nazivGrada: string): Promise<ObjektModel[]> {
    return await this.gradRepository.getAllObjektFromGrad(nazivGrada);
  }
}
