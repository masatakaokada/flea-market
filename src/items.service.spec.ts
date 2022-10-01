import { Test } from '@nestjs/testing';
import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { ItemRepository } from './items/item.repository';
import { ItemsService } from './items/items.service';
import { UserStatus } from './auth/user-status.enum';
import { ItemStatus } from './items/item-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockItemRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
});

const mockUser1 = {
  id: '1',
  username: 'test1',
  password: '1234',
  status: UserStatus.PREMIUM,
};

const mockUser2 = {
  id: '2',
  username: 'test2',
  password: '1234',
  status: UserStatus.FREE,
};

describe('ItemsServiceTest', () => {
  let itemsService;
  let itemRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      itemRepository.find.mockResolvedValue(expected);
      const result = await itemsService.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      itemRepository.findOneBy.mockResolvedValue(expected);
      const result = await itemsService.findById({ id: 'test-id' });
      expect(result).toEqual(expected);
    });

    it('異常系: 商品が存在しない', async () => {
      itemRepository.findOneBy.mockResolvedValue(null);
      await expect(itemsService.findById({ id: 'test-id' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
