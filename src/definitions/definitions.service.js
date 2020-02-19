import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  ERROR_GETTING_DOCUMENT,
  ERROR_NO_RESULTS_FOUND,
  ERROR_SCHEMA_EXISTS,
  SUCCESS_SCHEMA_ADDED,
  SUCCESS_SCHEMA_REMOVED,
  SUCCESS_SCHEMA_UPDATED,
} from '../resources/errorHandlers';

const SCHEMA = 'schema';

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
    const parsedSchema = JSON.parse(schema);
    return await this.db
        .collection(type)
        .doc(SCHEMA)
        .set(parsedSchema)
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
