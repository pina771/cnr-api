import { Inject, Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/api/dtos/register.dto';
import { KorisnikModel } from './korisnik.model';
import { IKorisnikRepository } from './repository.interface';

/* NOTE: Ovdje radimo injekciju ovisnosti na temelju sučelja (interface injection) */
/* Definiramo provider za KorisnikRepo u datoteci korisnik.repoProvider.ts */
const KorisnikRepo = () => Inject('KorisnikRepo');

@Injectable()
export class KorisnikService {
  constructor(
    @KorisnikRepo() private readonly korisnikRepository: IKorisnikRepository,
  ) {}

  async getAll(): Promise<KorisnikModel[]> {
    const queryResult = await this.korisnikRepository.getAll();
    return queryResult;
  }

  async getSingle(id: number): Promise<KorisnikModel> {
    return await this.korisnikRepository.getSingle(id);
  }

  async getByUsername(username: string): Promise<KorisnikModel | null> {
    return await this.korisnikRepository.getByUsername(username);
  }

  async newKorisnik(registerDto: RegisterDTO): Promise<boolean> {
    console.log('inside service');
    return await this.korisnikRepository.newKorisnik(registerDto);
  }
}
