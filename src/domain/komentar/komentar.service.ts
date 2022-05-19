import { Inject, Injectable } from '@nestjs/common';
import { IKomentarRepository } from './repository.interface';

const KomentarRepo = () => Inject('KomentarRepo');

@Injectable()
export class KomentarService {
  constructor(
    @KomentarRepo() private readonly komentarRepository: IKomentarRepository,
  ) {}

  async updateKomentar(id: number, tekst: string): Promise<any> {
    return this.komentarRepository.updateKomentar(id, tekst);
  }

  async deleteKomentar(id: number): Promise<any> {
    return this.komentarRepository.deleteKomentar(id);
  }
}
