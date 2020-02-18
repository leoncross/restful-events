import {Bind, Controller, Get, Post, Query, Req} from '@nestjs/common';
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
}
