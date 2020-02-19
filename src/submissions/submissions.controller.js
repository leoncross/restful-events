import {Bind, Controller, HttpCode, HttpException, Post, Query, Req,} from '@nestjs/common';
import SubmissionsService from './submissions.service.js';

import {STORAGE_SUCCESSFUL} from '../resources/errorHandlers';

@Controller('submissions')
export default class SubmissionsController {
  constructor(submissionsService = new SubmissionsService()) {
    this.submissionsService = submissionsService;
  }

  @Post()
  @HttpCode(200)
  @Bind(Query(), Req())
  async createSubmission(query, req) {
    const schema = query.schema;
    const submission = req.body.data;

    const response = await this.submissionsService.createSubmission(
      schema,
      submission,
    );
    if ('error' in response) {
      throw new HttpException('storage unsuccessful', 400);
    }
    return STORAGE_SUCCESSFUL;
  }
}
