import { Module } from '@nestjs/common';
import { KorisnikRepoModule } from 'src/persistence/korisnik/korisnik.repository.module';
import { KorisnikService } from './korisnik.service';

@Module({
  imports: [KorisnikRepoModule],
  providers: [KorisnikService],
  exports: [KorisnikService],
})
export class KorisnikModule {}
