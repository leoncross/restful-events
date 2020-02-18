import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SubmissionsService from './submissions.service';
import SubmissionsController from './submissions.controller';

const expect = chai.expect;
chai.use(sinonChai);

describe('SubmissionsController', () => {
  describe('/Get', () => {
    it('calls getSchema on SubmissionsController', () => {
      const fakeDb = 'fakeDb';
      const submissionsService = new SubmissionsService(fakeDb);
      const submissionsServiceCreateSubmissionStub = sinon.stub(
          submissionsService,
          'createSubmission',
      );

      const submissionsController = new SubmissionsController(
          submissionsService,
      );

      const query = {schema: 'confetti'};
      const req = {body: {data: 'confetti data'}};

      submissionsController.createSubmission(query, req);

      expect(submissionsServiceCreateSubmissionStub).calledOnceWith(
          query.schema,
          req.body.data,
      );
    });
  });
});
