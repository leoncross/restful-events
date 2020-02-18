import chai from 'chai';
import sinonChai from 'sinon-chai';

import SubmissionsService from './submissions.service';
import {confetti} from '../../test/testHelpers/resources';
import generateMockFirestore from "../../test/testHelpers/mockFirestore";

const expect = chai.expect;
chai.use(sinonChai);

describe('SubmissionsService', () => {
  let submissionsService;

  beforeEach(() => {
    let fakeDb = 'fakeDb';
    submissionsService = new SubmissionsService(fakeDb);
  });

  describe('matchesRequired', () => {
    it('returns true submission contains required key', () => {
      const schemaElement = {
        key: 'magicstyle',
        validation: {required: true},
      };
      const submission = {magicstyle: 'escapologist'};
      expect(submissionsService.matchesRequired(schemaElement, submission)).to
          .be.true;
    });

    it('returns true when validation is not required', () => {
      const schemaElement = {
        key: 'magicstyle',
        validation: {required: false},
      };
      const submission = {something_different: 'escapologist'};
      expect(submissionsService.matchesRequired(schemaElement, submission)).to
          .be.true;
    });
    it('returns false validation is required, and submission does not contain key', () => {
      const schemaElement = {
        key: 'magicstyle',
        validation: {required: true},
      };
      const submission = {something_different: 'escapologist'};
      expect(submissionsService.matchesRequired(schemaElement, submission)).to
          .be.false;
    });
  });

  describe('matchesOptions', () => {
    it('returns true if submission contains required options', () => {
      const schemaElement = {
        key: 'magictype',
        options: [
          {name: 'Mix and mingle magic', value: 'mixmingle'},
          {name: 'Magic show', value: 'magicshow'},
          {name: 'Table magic', value: 'tablemagic'},
        ],
        title: 'How would you like the magic performed?',
        type: 'radios',
        validation: {required: true},
      };
      const submissionValue = 'tablemagic';
      expect(submissionsService.matchesOptions(schemaElement, submissionValue))
          .to.be.true;
    });
    it('returns true if submission does not contain options', () => {
      const schemaElement = {
        key: 'magictype',
        title: 'How would you like the magic performed?',
        type: 'radios',
        validation: {required: true},
      };
      const submissionValue = 'tablemagic';
      expect(submissionsService.matchesOptions(schemaElement, submissionValue))
          .to.be.true;
    });
    it('returns false if submission does not contain required options', () => {
      const schemaElement = {
        key: 'magictype',
        options: [
          {name: 'Mix and mingle magic', value: 'mixmingle'},
          {name: 'Magic show', value: 'magicshow'},
          {name: 'Table magic', value: 'tablemagic'},
        ],
        title: 'How would you like the magic performed?',
        type: 'radios',
        validation: {required: true},
      };
      const submissionValue = 'cardtricks';
      expect(submissionsService.matchesOptions(schemaElement, submissionValue))
          .to.be.false;
    });
  });
  describe('matchesLength', () => {
    it('returns true when submission matches required length', () => {
      const schemaElement = {
        key: 'body',
        placeholder: 'Compose message...',
        title: 'Your Personal Message to Suppliers',
        type: 'textarea',
        validation: {
          maxLength: 250,
          required: true,
          validationMessage: 'Personal message is required!',
        },
      };
      const submissionValue =
          'this is a happy message that matches required message length';
      expect(submissionsService.matchesLength(schemaElement, submissionValue))
          .to.be.true;
    });
    it('returns true when submission has no required length', () => {
      const schemaElement = {
        key: 'body',
        placeholder: 'Compose message...',
        title: 'Your Personal Message to Suppliers',
        type: 'textarea',
        validation: {
          required: true,
          validationMessage: 'Personal message is required!',
        },
      };
      const submissionValue =
          'this is a happy message that matches the non-required length';
      expect(submissionsService.matchesLength(schemaElement, submissionValue))
          .to.be.true;
    });

    it('returns false when submission doesnt match required length', () => {
      const schemaElement = {
        key: 'body',
        placeholder: 'Compose message...',
        title: 'Your Personal Message to Suppliers',
        type: 'textarea',
        validation: {
          maxLength: 5,
          required: true,
          validationMessage: 'Personal message is required!',
        },
      };
      const submissionValue = 'this is unfortunately a sad message that fails';

      expect(submissionsService.matchesLength(schemaElement, submissionValue))
          .to.be.false;
    });
  });

  describe('matchesPattern', () => {
    it('returns true if the submission value matches the required pattern', () => {
      const schemaElement = {
        key: 'email',
        placeholder: 'Your email...',
        title: 'Email',
        type: 'string',
        validation: {pattern: '^\\S+@\\S+$', required: true},
      };
      const submissionValue = 'success@email.com';

      expect(submissionsService.matchesPattern(schemaElement, submissionValue))
          .to.be.true;
    });
    it('returns true if the schemaElement has no required pattern ', () => {
      const schemaElement = {
        key: 'email',
        placeholder: 'Your email...',
        title: 'Email',
        type: 'string',
        validation: {required: true},
      };
      const submissionValue = 'success@email.com';

      expect(submissionsService.matchesPattern(schemaElement, submissionValue))
          .to.be.true;
    });
    it('returns false if the submission value does not match the required pattern', () => {
      const schemaElement = {
        key: 'email',
        placeholder: 'Your email...',
        title: 'Email',
        type: 'string',
        validation: {pattern: '^\\S+@\\S+$', required: true},
      };
      const submissionValue = 'failing_email';

      expect(submissionsService.matchesPattern(schemaElement, submissionValue))
          .to.be.false;
    });
  });

  describe('matchesDate', () => {
    it('returns true if submission value is greater than minDate', () => {
      const schemaElement = {
        key: 'date',
        placeholder: 'Date of your event',
        type: 'date',
        validation: {minDate: '2018-01-21', required: true},
      };

      const submissionValue = '2020-04-14';

      expect(submissionsService.matchesDate(schemaElement, submissionValue)).to
          .be.true;
    });
    it('returns false if submission value is lesser than minDate', () => {
      const schemaElement = {
        key: 'date',
        placeholder: 'Date of your event',
        type: 'date',
        validation: {minDate: '2018-01-21', required: true},
      };

      const submissionValue = '2016-12-04';

      expect(submissionsService.matchesDate(schemaElement, submissionValue)).to
          .be.false;
    });
  });

  describe('createSubmission', () => {
    it('posts if submission matches schema', async () => {
      const userData = {
        type: 'birthday',
        body: 'this is a message to check if it works',
        name: 'alfred',
        email: 'alfred@gmail.co.uk',
        date: '2019-01-22',
      };
      const functionality = 'getSuccess';
      const result = confetti;
      const schemaType = 'confetti';

      const mockFirestore = generateMockFirestore({functionality, result});
      submissionsService = new SubmissionsService(mockFirestore);

      const creationResult = await submissionsService.createSubmission(schemaType, userData);
      expect(creationResult).to.deep.equal({success: 'storage successful'});
    });

    it('returns error that storage was not successful - no data found', async () => {
      let fakeDb = 'fakeDb';
      submissionsService = new SubmissionsService(fakeDb);

      const userData = {
        body: 'this is a message to check if it works',
        name: 'alfred',
        email: 'alfred@gmail.co.uk',
        date: '2019-01-22',
      };

      const functionality = 'getNoResults';
      const result = confetti;
      const schemaType = 'confetti';

      const mockFirestore = generateMockFirestore({functionality, result});
      submissionsService = new SubmissionsService(mockFirestore);

      const creationResult = await submissionsService.createSubmission(schemaType, userData);
      expect(creationResult).to.deep.equal({error: 'storage unsuccessful'});

    });

    it('returns error that storage was not successful - error in submission', async () => {
      let fakeDb = 'fakeDb';
      submissionsService = new SubmissionsService(fakeDb);

      const userData = {
        body: 'this is a message to check if it works',
        name: 'alfred',
        email: 'alfred@gmail.co.uk',
        date: '2019-01-22',
      };

      const functionality = 'getSuccess';
      const result = confetti;
      const schemaType = 'confetti';

      const mockFirestore = generateMockFirestore({functionality, result});
      submissionsService = new SubmissionsService(mockFirestore);

      const creationResult = await submissionsService.createSubmission(schemaType, userData);
      expect(creationResult).to.deep.equal({error: 'storage unsuccessful'});
    });
  });
});
