import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SubmissionsService from './submissions.service';
import SubmissionsController from './submissions.controller';

const expect = chai.expect;
chai.use(sinonChai);

const ERROR_STORAGE_UNSUCCESSFUL = {
  Error: { message: 'storage unsuccessful', status: 400 },
};
const STORAGE_SUCCESSFUL = { success: 'storage successful' };

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
      expect(createSubmissionResponse).to.equal(STORAGE_SUCCESSFUL);
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
      expect(createSubmissionResponse).to.deep.equal(
        ERROR_STORAGE_UNSUCCESSFUL,
      );
    });
  });
});
