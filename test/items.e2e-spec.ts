import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ItemsModule } from '../src/items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('ItemsController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        ItemsModule,
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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await moduleFixture.close();
  });

  it('/items (GET)', () => {
    return request(app.getHttpServer()).get('/items').expect(200).expect([]);
  });
});
