import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import {DefinitionsService} from './definitions.service';
import {DefinitionsController} from './definitions.controller';

const expect = chai.expect;
chai.use(sinonChai);

describe('DefinitionsController', () => {
  let definitionsController;
  let definitionsService;
  let definitionsServiceGetSchemaStub;

  beforeEach(() => {
    definitionsService = new DefinitionsService();

    definitionsServiceGetSchemaStub = sinon.stub(
        definitionsService,
        'getSchema',
    );

    definitionsController = new DefinitionsController(definitionsService);
  });
  describe('/Get', () => {
    it('calls definitions service getSchema with passed arguments', () => {
      let getType = {schema: 'confetti'};

      definitionsController.getSchema(getType);

      expect(definitionsServiceGetSchemaStub).calledOnceWith(getType.schema);
    });
  });
});
