import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import {DefinitionsService} from './definitions.service';
import {DefinitionsController} from './definitions.controller';

const expect = chai.expect;
chai.use(sinonChai);

describe('DefinitionsController', () => {
  let fakeDb;
  let definitionsController;
  let definitionsService;
  let definitionsServiceGetSchemaStub;
  let definitionsServiceCreateSchemaStub;

  beforeEach(() => {
    fakeDb = 'fakeDb';
    definitionsService = new DefinitionsService(fakeDb);

    definitionsServiceGetSchemaStub = sinon.stub(
        definitionsService,
        'getSchema',
    );

    definitionsServiceCreateSchemaStub = sinon.stub(
        definitionsService,
        'createSchema',
    );

    definitionsController = new DefinitionsController(definitionsService);
  });

  describe('/Get', () => {
    it('calls getSchema on DefinitionsService', () => {
      let getType = {schema: 'confetti'};

      definitionsController.getSchema(getType);

      expect(definitionsServiceGetSchemaStub).calledOnceWith(getType.schema);
    });
  });
  describe('/Post', () => {
    it('calls createSchema on DefinitionsService', () => {
      let getType = {schema: 'confetti'};
      let req = {body: {data: 'schema'}};

      definitionsController.createSchema(getType, req);
      expect(definitionsServiceCreateSchemaStub).calledOnceWith(
          getType.schema,
          req.body.data,
      );
    });
  });
});
