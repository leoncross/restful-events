import {Bind, Controller, Get, Query} from '@nestjs/common';
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
}
