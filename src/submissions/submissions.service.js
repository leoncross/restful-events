import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class SubmissionsService {
  constructor(db = admin.firestore()) {
    this.db = db;
  }
}
