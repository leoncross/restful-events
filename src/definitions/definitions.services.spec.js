import chai from 'chai';
import sinonChai from 'sinon-chai';
import {DefinitionsService} from './definitions.service';
import generateMockFirestore from '../../test/testHelpers/mockFirestore';
import {
  ERROR_GETTING_DOCUMENT,
  ERROR_NO_RESULTS_FOUND,
  ERROR_SCHEMA_EXISTS,
  SUCCESS_SCHEMA_ADDED,
  SUCCESS_SCHEMA_REMOVED,
  SUCCESS_SCHEMA_UPDATED,
} from '../resources/errorHandlers';

const expect = chai.expect;
chai.use(sinonChai);

describe('DefinitionsService', () => {
  const confetti = 'confetti';
  const infoToPublish = JSON.stringify({
    confetti: [
      {
        key: 'type',
        options: [
          {
            name: 'Birthday',
            value: 'birthday',
          },
          {
            name: 'Wedding',
            value: 'wedding',
          },
          {
            name: 'Stag Party',
            value: 'stagparty',
          },
        ],
        type: 'radios',
        validation: {
          required: true,
        },
      },
    ],
  });

  let definitionsService;

  describe('/GET', () => {
    it('retrieves requested schema', async () => {
      const functionality = 'getSuccess';
      const result = { type: confetti };

      const mockFirestore = generateMockFirestore({ functionality, result });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(confetti).then(data => {
        expect(data).to.deep.equal(result);
      });
    });

    it('does not find schema', async () => {
      const functionality = 'getNoResults';

      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(confetti).then(data => {
        expect(data).to.deep.equal(ERROR_NO_RESULTS_FOUND);
      });
    });

    it('handles errors from db when getting data', async () => {
      const functionality = 'getThrows';

      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(confetti).catch(data => {
        expect(data).to.deep.equal(ERROR_GETTING_DOCUMENT);
      });
    });
  });
  describe('/POST', () => {
    it('successfully posts schema', async () => {
      const functionality = 'postSuccessfully';
      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
        .createSchema(confetti, infoToPublish)
        .then(data => {
          expect(data).to.deep.equal(SUCCESS_SCHEMA_ADDED);
        });
    });
    it('fails to post schema because type already exists', async () => {
      const functionality = 'getSuccess';
      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
        .createSchema(confetti, infoToPublish)
        .then(data => {
          expect(data).to.deep.equal(ERROR_SCHEMA_EXISTS);
        });
    });
    it('handles errors from db when posting data', async () => {
      const functionality = 'postThrows';
      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
        .createSchema(confetti, infoToPublish)
        .then(data => {
          expect(data).to.deep.equal(ERROR_GETTING_DOCUMENT);
        });
    });
  });
  describe('/UPDATE', () => {
    it('updates schema', async () => {
      const functionality = 'postSuccessfully';
      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
        .updateSchema(confetti, infoToPublish)
        .then(data => {
          expect(data).to.deep.equal(SUCCESS_SCHEMA_UPDATED);
        });
    });
  });
  describe('/DELETE', () => {
    it('deletes schema', async () => {
      const functionality = 'removeSchema';
      const mockFirestore = generateMockFirestore({ functionality });
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.deleteSchema(confetti).then(data => {
        expect(data).to.deep.equal(SUCCESS_SCHEMA_REMOVED);
      });
    });
  });
});
