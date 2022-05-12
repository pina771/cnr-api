import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { KorisnikModule } from './domain/korisnik/korisnik.module';

@Module({
  imports: [MikroOrmModule.forRoot(), ApiModule, DomainModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
