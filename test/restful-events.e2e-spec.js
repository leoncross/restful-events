import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  confetti,
  magicianAltered,
  magician,
} from './testHelpers/resources.js';

describe('restful events - e2e', () => {
  const ERROR_NO_RESULTS_FOUND = { error: 'no results found' };
  const ERROR_STORAGE_UNSUCCESSFUL = { error: 'storage unsuccessful' };

  const SUCCESS_SCHEMA_ADDED = { success: 'schema added' };
  const SUCCESS_SCHEMA_UPDATED = { success: 'schema updated' };
  const SUCCESS_SCHEMA_REMOVED = { success: 'schema removed' };
  const STORAGE_SUCCESSFUL = { success: 'storage successful' };

  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('Definitions', () => {
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
          .set('Content-Type', 'application/json')
          .send({ data: magician })
          .expect(201)
          .expect(SUCCESS_SCHEMA_ADDED);

        await request(app.getHttpServer())
          .put('/definitions/?schema=magician')
          .send({ data: magicianAltered })
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
          .send({ data: magician })
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
  describe('Submissions', () => {
    describe('/POST', () => {
      it('posts a new submission', async () => {
        const userData = {
          type: 'birthday',
          body: 'this is a message to check if it works',
          name: 'leon',
          email: 'leon@lscross.co.uk',
          date: '2019-01-22',
        };

        return await request(app.getHttpServer())
          .post('/submissions/?schema=confetti')
          .send({ data: userData })
          .set('Content-Type', 'application/json')
          .expect(200)
          .expect(STORAGE_SUCCESSFUL);
      });
      it('fails to posts a new submission due not matching schema', async () => {
        const UNACCEPTED_TYPE = 'not accepted';

        const userData = {
          type: UNACCEPTED_TYPE,
          body: 'this is a message to check if it works',
          name: 'leon',
          email: 'leon@lscross.co.uk',
          date: '2019-01-22',
        };

        return await request(app.getHttpServer())
          .post('/submissions/?schema=confetti')
          .send({ data: userData })
          .set('Content-Type', 'application/json')
          .expect(400)
          .expect(ERROR_STORAGE_UNSUCCESSFUL);
      });
    });
  });
});
