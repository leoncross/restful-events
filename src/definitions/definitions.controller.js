import {Bind, Controller, Delete, Get, Post, Put, Query, Req,} from '@nestjs/common';
import {DefinitionsService} from './definitions.service';

@Controller('definitions')
export class DefinitionsController {
  constructor(definitionsService = new DefinitionsService()) {
    this.definitionsService = definitionsService;
  }

  @Get()
  @Bind(Query())
  getSchema(query) {
    return this.definitionsService.getSchema(query.schema);
  }

  @Post()
  @Bind(Query(), Req())
  createSchema(query, req) {
    return this.definitionsService.createSchema(query.schema, req.body.data);
  }

  @Put()
  @Bind(Query(), Req())
  updateSchema(query, req) {
    return this.definitionsService.updateSchema(query.schema, req.body.data);
  }

  @Delete()
  @Bind(Query())
  deleteSchema(query) {
    return this.definitionsService.deleteSchema(query.schema);
  }
}
