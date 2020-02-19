import {
  Bind,
  Controller,
  Post,
  Query,
  Req,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import SubmissionsService from './submissions.service.js';

const STORAGE_SUCCESSFUL = { success: 'storage successful' };
const ERROR_STORAGE_UNSUCCESSFUL = { error: 'storage unsuccessful' };

@Controller('submissions')
export default class SubmissionsController {
  constructor(submissionsService = new SubmissionsService()) {
    this.submissionsService = submissionsService;
  }

  @Post()
  @HttpCode(200)
  @Bind(Query(), Req())
  async createSubmission(query, req) {
    const hasError = response => 'error' in schema;

    const schema = query.schema;
    const submission = req.body.data;

    const response = await this.submissionsService.createSubmission(
      schema,
      submission,
    );
    if ('error' in response) {
      return new HttpException('storage unsuccessful', 400);
    }
    return response;
  }
}
