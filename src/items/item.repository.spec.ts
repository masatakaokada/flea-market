import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from '@jest/globals';
import { ItemRepository } from './item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('ItemRepositoryTest', () => {
  let module: TestingModule;
  let itemRepository: ItemRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'postgres',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: ['src/entities/*.entity.ts'],
          synchronize: true,
        }),
      ],
      providers: [ItemRepository],
    }).compile();

    itemRepository = module.get<ItemRepository>(ItemRepository);
  });

  afterEach(async () => {
    module.close();
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      const result = await itemRepository.find();
      expect(result).toEqual(expected);
    });
  });
});
