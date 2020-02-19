import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SubmissionsService from './submissions.service';
import SubmissionsController from './submissions.controller';
import {ERROR_STORAGE_UNSUCCESSFUL, STORAGE_SUCCESSFUL,} from '../resources/errorHandlers';
import {HttpException} from '@nestjs/common';

const expect = chai.expect;
chai.use(sinonChai);

describe('SubmissionsController', () => {
  describe('/Get', () => {
    it('calls getSchema on SubmissionsController and returns storage successful', async () => {
      const fakeDb = 'fakeDb';
      const submissionsService = new SubmissionsService(fakeDb);
      const submissionsServiceCreateSubmissionStub = sinon
        .stub(submissionsService, 'createSubmission')
        .resolves(STORAGE_SUCCESSFUL);

      const submissionsController = new SubmissionsController(
        submissionsService,
      );

      const query = { schema: 'confetti' };
      const req = { body: { data: 'confetti data' } };

      const createSubmissionResponse = await submissionsController.createSubmission(
        query,
        req,
      );

      expect(submissionsServiceCreateSubmissionStub).calledOnceWith(
          query.schema,
          req.body.data,
      );
      expect(createSubmissionResponse).to.deep.equal(STORAGE_SUCCESSFUL);
    });

    it('calls getSchema on SubmissionsController and returns storage unsuccessful', async () => {
      const fakeDb = 'fakeDb';
      const submissionsService = new SubmissionsService(fakeDb);
      const submissionsServiceCreateSubmissionStub = sinon
          .stub(submissionsService, 'createSubmission')
          .resolves(ERROR_STORAGE_UNSUCCESSFUL);

      const submissionsController = new SubmissionsController(
          submissionsService,
      );
      const returnedError = new HttpException('storage unsuccessful', 400);
      const query = {schema: 'confetti'};
      const req = {body: {data: 'confetti data'}};
      let createSubmissionResponse = null;

      await submissionsController
          .createSubmission(query, req)
          .catch(response => {
            createSubmissionResponse = response;
          });

      expect(submissionsServiceCreateSubmissionStub).calledOnceWith(
          query.schema,
          req.body.data,
      );
      expect(JSON.stringify(createSubmissionResponse)).to.equal(
          JSON.stringify(returnedError),
      );
    });
  });
});
