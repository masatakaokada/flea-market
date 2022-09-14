import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import ormconfig from './config/ormconfig';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot(ormconfig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
