import { Inject, Injectable } from '@nestjs/common';
import { GradModel } from './grad.model';
import { IGradRepository } from './repository.interface';

const GradRepo = () => Inject('GradRepo');

@Injectable()
export class GradService {
  constructor(@GradRepo() private readonly gradRepository: IGradRepository) {}

  async getAll(): Promise<GradModel[]> {
    return this.gradRepository.getAll();
  }
}
