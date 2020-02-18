import chai from 'chai';
import sinonChai from 'sinon-chai';
import {DefinitionsService} from './definitions.service';
import generateMockFirestore from '../../test/testHelpers/mockFirestore';

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
      const result = {type: confetti};

      const mockFirestore = generateMockFirestore({functionality, result});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(confetti).then(data => {
        expect(data).to.deep.equal(result);
      });
    });

    it('does not find schema', async () => {
      const functionality = 'getNoResults';
      const result = {error: 'no results found'};

      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(confetti).then(data => {
        expect(data).to.deep.equal(result);
      });
    });

    it('handles errors from db when getting data', async () => {
      const functionality = 'getThrows';
      const result = {error: 'error getting document'};

      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(confetti).catch(data => {
        expect(data).to.deep.equal(result);
      });
    });
  });
  describe('/POST', () => {
    it('successfully posts schema', async () => {
      const functionality = 'postSuccessfully';
      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
          .createSchema(confetti, infoToPublish)
          .then(data => {
            expect(data).to.deep.equal({success: 'schema added'});
          });
    });
    it('fails to post schema because type already exists', async () => {
      const functionality = 'getSuccess';
      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
          .createSchema(confetti, infoToPublish)
          .then(data => {
            expect(data).to.deep.equal({error: 'document type exists'});
          });
    });
    it('handles errors from db when posting data', async () => {
      const functionality = 'postThrows';
      const result = {error: 'error getting document'};

      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
          .createSchema(confetti, infoToPublish)
          .then(data => {
            expect(data).to.deep.equal(result);
          });
    });
  });
  describe('/UPDATE', () => {
    it('updates schema', async () => {
      const functionality = 'postSuccessfully';
      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService
          .updateSchema(confetti, infoToPublish)
          .then(data => {
            expect(data).to.deep.equal({success: 'schema updated'});
          });
    });
  });
  describe('/DELETE', () => {
    it('deletes schema', async () => {
      const functionality = 'removeSchema';
      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.deleteSchema(confetti).then(data => {
        expect(data).to.deep.equal({success: 'schema removed'});
      });
    });
  });
});
