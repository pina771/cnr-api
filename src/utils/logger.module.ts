import { Module } from '@nestjs/common';
import { AppLoggerMiddleware } from './logger';

@Module({
  providers: [AppLoggerMiddleware],
  exports: [AppLoggerMiddleware],
})
export class LoggerModule {}
