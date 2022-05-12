import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Korisnik } from 'src/entities/Korisnik';
import { KorisnikRepoProvider } from './korisnik.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Korisnik])],
  providers: [KorisnikRepoProvider],
  exports: [KorisnikRepoProvider],
})
export class KorisnikRepoModule {}
