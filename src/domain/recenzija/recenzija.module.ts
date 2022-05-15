import { Module } from '@nestjs/common';
import { RecenzijaRepoModule } from 'src/persistence/recenzija/recenzija.repository.module';
import { RecenzijaService } from './recenzija.service';

@Module({
  imports: [RecenzijaRepoModule],
  providers: [RecenzijaService],
  exports: [RecenzijaService],
})
export class RecenzijaModule {}
