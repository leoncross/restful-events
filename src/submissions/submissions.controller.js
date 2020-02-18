import {Bind, Controller, Post, Query, Req} from '@nestjs/common';
import {SubmissionsService} from './submissions.service.js';

@Controller('submissions')
export default class SubmissionsController {
  constructor(submissionsService = new SubmissionsService()) {
    this.submissionsService = submissionsService;
  }

  @Post()
  @Bind(Query(), Req())
  createSubmission(query, req) {
    return this.submissionsService.createSubmission(
        query.schema,
        req.body.data,
    );
  }
}
