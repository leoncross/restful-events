import request from 'supertest';
import {Test} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {confetti, magician, magicianAltered,} from './testHelpers/resources.js';

describe('Definitions e2e', () => {
  const ERROR_NO_RESULTS_FOUND = {error: 'no results found'};

  const SUCCESS_SCHEMA_ADDED = {success: 'schema added'};
  const SUCCESS_SCHEMA_UPDATED = {success: 'schema updated'};
  const SUCCESS_SCHEMA_REMOVED = {success: 'schema removed'};

  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/GET', () => {
    it('returns requested schema', async () => {
      return await request(app.getHttpServer())
          .get('/definitions/?schema=confetti')
          .expect(200)
          .expect(confetti);
    });

    it('no results found', async () => {
      return await request(app.getHttpServer())
          .get('/definitions/?schema=doesntExist')
          .expect(200)
          .expect(ERROR_NO_RESULTS_FOUND);
    });
  });
  describe('/POST /PUT /GET /DELETE', () => {
    it('posts, updates, gets then removes the updated schema', async () => {
      await request(app.getHttpServer())
          .post('/definitions/?schema=magician')
          .send({data: magician})
          .set('Content-Type', 'application/json')
          .expect(201)
          .expect(SUCCESS_SCHEMA_ADDED);

      await request(app.getHttpServer())
          .put('/definitions/?schema=magician')
          .send({data: magicianAltered})
          .set('Content-Type', 'application/json')
          .expect(200)
          .expect(SUCCESS_SCHEMA_UPDATED);

      await request(app.getHttpServer())
          .get('/definitions/?schema=magician')
          .expect(200)
          .expect(magicianAltered);

      return await request(app.getHttpServer())
          .delete('/definitions/?schema=magician')
          .set('Content-Type', 'application/json')
          .expect(200)
          .expect(SUCCESS_SCHEMA_REMOVED);
    });
  });

  describe('/POST and /DELETE', () => {
    it('posts new schema then removes', async () => {
      await request(app.getHttpServer())
          .post('/definitions/?schema=magician')
          .send({data: magician})
          .set('Content-Type', 'application/json')
          .expect(201)
          .expect(SUCCESS_SCHEMA_ADDED);

      return await request(app.getHttpServer())
          .delete('/definitions/?schema=magician')
          .set('Content-Type', 'application/json')
          .expect(200)
          .expect(SUCCESS_SCHEMA_REMOVED);
    });
  });
});
