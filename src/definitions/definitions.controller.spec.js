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
  let definitionsServiceUpdateSchemaStub;
  let definitionsServiceDeleteSchemaStub;

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
    definitionsServiceUpdateSchemaStub = sinon.stub(
        definitionsService,
        'updateSchema'
    );
    definitionsServiceDeleteSchemaStub = sinon.stub(
        definitionsService,
        'deleteSchema'
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
  describe('/Put', () => {
    it('calls updateSchema on DefinitionsService', () => {
      let getType = {schema: 'confetti'};
      let req = {body: {data: 'schema'}};

      definitionsController.updateSchema(getType, req);
      expect(definitionsServiceUpdateSchemaStub).calledOnceWith(
          getType.schema,
          req.body.data,
      );
    });
  });
  describe('/Delete', () => {
    it('calls deleteSchema on DefinitionsService', () => {
      let getType = {schema: 'confetti'};

      definitionsController.deleteSchema(getType);
      expect(definitionsServiceDeleteSchemaStub).calledOnceWith(
          getType.schema
      );
    });
  });

});
