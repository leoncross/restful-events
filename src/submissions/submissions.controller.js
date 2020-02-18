import {Controller} from '@nestjs/common';
import {SubmissionsService} from './submissions.service.js';

@Controller('submissions')
export class SubmissionsController {
  constructor(submissionsService = new SubmissionsService()) {
    this.submissionsService = submissionsService;
  }
}
