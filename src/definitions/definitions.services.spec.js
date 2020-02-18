import chai from 'chai';
import sinonChai from 'sinon-chai';
import {DefinitionsService} from './definitions.service';
import generateMockFirestore from '../../test/testHelpers/mockFirestore';

const expect = chai.expect;
chai.use(sinonChai);

describe('DefinitionsService', () => {
  const confetti = 'confetti';

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

    it('handles DB related errors', async () => {
      const args = 'confetti';
      const functionality = 'getThrows';
      const result = {error: 'error getting document'};

      const mockFirestore = generateMockFirestore({functionality});
      definitionsService = new DefinitionsService(mockFirestore);

      await definitionsService.getSchema(args).catch(data => {
        expect(data).to.deep.equal(result);
      });
    });
  });
});
