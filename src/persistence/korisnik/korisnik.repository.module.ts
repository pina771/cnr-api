import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Gost } from 'src/entities/Gost';
import { Korisnik } from 'src/entities/Korisnik';
import { Ugostitelj } from 'src/entities/Ugostitelj';
import { EntityModelMapper } from '../entity-model.mapper';
import { KorisnikRepoProvider } from './korisnik.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Korisnik, Ugostitelj, Gost])],
  providers: [KorisnikRepoProvider, EntityModelMapper],
  exports: [KorisnikRepoProvider],
})
export class KorisnikRepoModule {}
