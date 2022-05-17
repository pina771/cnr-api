import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { KorisnikModule } from 'src/domain/korisnik/korisnik.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    KorisnikModule,
    PassportModule,
    JwtModule.register({
      secret: 'reflections-of-a-floating-world',
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
