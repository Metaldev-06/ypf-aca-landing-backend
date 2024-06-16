import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DolarApiModule } from './promotions-api/promotions.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
    }),
    DolarApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
