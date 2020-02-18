import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';

const SCHEMA = 'schema';
const ERROR_NO_RESULTS_FOUND = {error: 'no results found'};
const ERROR_GETTING_DOCUMENT = {error: 'error getting document'};

@Injectable()
export class DefinitionsService {
  constructor(db = admin.firestore()) {
    this.db = db;
  }

  async getSchema(type) {
    return await this.db
        .collection(type)
        .doc(SCHEMA)
        .get()
        .then(doc => {
          if (!doc.exists) return ERROR_NO_RESULTS_FOUND;
          return doc.data();
        })
        .catch(() => {
          return ERROR_GETTING_DOCUMENT;
        });
  }
}
