import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

const SCHEMA = 'schema';

const ERROR_NO_RESULTS_FOUND = { error: 'no results found' };
const ERROR_GETTING_DOCUMENT = { error: 'error getting document' };
const ERROR_SCHEMA_EXISTS = { error: 'document type exists' };

const SUCCESS_SCHEMA_ADDED = { success: 'schema added' };
const SUCCESS_SCHEMA_UPDATED = { success: 'schema updated' };
const SUCCESS_SCHEMA_REMOVED = { success: 'schema removed' };

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

  async uploadSchema(type, schema, successMessage) {
    return await this.db
      .collection(type)
      .doc(SCHEMA)
      .set(schema)
      .then(() => {
        return successMessage;
      })
      .catch(() => {
        return ERROR_GETTING_DOCUMENT;
      });
  }

  async createSchema(type, schema) {
    let doesSchemaExist = await this.getSchema(type);

    if (doesSchemaExist === ERROR_NO_RESULTS_FOUND) {
      return await this.uploadSchema(type, schema, SUCCESS_SCHEMA_ADDED);
    }
    return ERROR_SCHEMA_EXISTS;
  }

  async updateSchema(type, schema) {
    return await this.uploadSchema(type, schema, SUCCESS_SCHEMA_UPDATED);
  }

  async deleteSchema(type) {
    await this.db
      .collection(type)
      .doc(SCHEMA)
      .delete();
    return SUCCESS_SCHEMA_REMOVED;
  }
}
