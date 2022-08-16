import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ItemRepository])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
