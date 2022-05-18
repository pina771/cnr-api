import { Inject, Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/api/dtos/register.dto';
import { ObjektModel } from '../objekt/objekt.model';
import { RecenzijaModel } from '../recenzija/recenzija.model';
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

  async newKorisnik(korisnik: KorisnikModel): Promise<boolean> {
    return await this.korisnikRepository.newKorisnik(korisnik);
  }

  async getAll(): Promise<KorisnikModel[]> {
    const queryResult = await this.korisnikRepository.getAll();
    return queryResult;
  }

  async getAllObjektFromKorisnik(username: string): Promise<ObjektModel[]> {
    return await this.korisnikRepository.getAllObjektFromKorisnik(username);
  }

  async getAllRecenzijaFromKorisnik(
    username: string,
  ): Promise<RecenzijaModel[]> {
    return await this.korisnikRepository.getAllRecenzijaFromKorisnik(username);
  }

  async getSingle(username: string): Promise<KorisnikModel> {
    return await this.korisnikRepository.getSingle(username);
  }
}
