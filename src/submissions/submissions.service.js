import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';
import {ERROR_NO_RESULTS_FOUND, ERROR_STORAGE_UNSUCCESSFUL, STORAGE_SUCCESSFUL,} from '../resources/errorHandlers';

const SCHEMA = 'schema';
const ERROR = 'error';
const KEY = 'key';

@Injectable()
export default class SubmissionsService {
  constructor(db = admin.firestore()) {
    this.db = db;
  }

  async getSchemaType(schemaType) {
    return await this.db
      .collection(schemaType)
      .doc(SCHEMA)
      .get()
      .then(doc => {
        if (!doc.exists) return ERROR_NO_RESULTS_FOUND;
        return doc.data();
      });
  }

  async uploadSubmission(type, submission) {
    return await this.db
      .collection(type)
      .doc()
      .set(submission)
  }

  matchesRequired(schemaElement, submission) {
    if (schemaElement.validation.required && submission[schemaElement.key]) {
      return true;
    }
    return schemaElement.validation.required === false;
  }

  matchesOptions(schemaElement, submissionValue) {
    if (schemaElement.options) {
      let matches = false;
      schemaElement.options.forEach(option => {
        if (option.value === submissionValue) {
          matches = true;
        }
      });
      return matches;
    }
    return true;
  }

  matchesLength(schemaElement, submissionValue) {
    if (!submissionValue) return false;
    if (schemaElement.validation.maxLength) {
      return submissionValue.length <= schemaElement.validation.maxLength;
    }
    return true;
  }

  matchesPattern(schemaElement, submissionValue) {
    if (!submissionValue) return false;
    if (schemaElement.validation.pattern) {
      return !!submissionValue.match(schemaElement.validation.pattern);
    }
    return true;
  }

  matchesDate(schemaElement, submissionValue) {
    if (!submissionValue) return false;
    if (schemaElement.validation.minDate) {
      const submissionValueDate = new Date(submissionValue);
      const schemaMinDate = new Date(schemaElement.validation.minDate);

      if (submissionValueDate <= schemaMinDate) {
        return false;
      }
    }
    return true;
  }

  noSchemaFound(schema) {
    return ERROR in schema;
  }

  handleValidationRequirements(schema, submission) {
    const failValidation = () => {
      validation = false;
    };

    let validation = true;

    for (let i = 0; i < schema.length; i++) {
      if (!validation) break;
      if (KEY in schema[i]) {
        const schemaSection = schema[i];
        const subValue = submission[schemaSection.key];

        if (!this.matchesRequired(schemaSection, submission)) failValidation();
        if (!this.matchesOptions(schemaSection, subValue)) failValidation();
        if (!this.matchesLength(schemaSection, subValue)) failValidation();
        if (!this.matchesPattern(schemaSection, subValue)) failValidation();
        if (!this.matchesDate(schemaSection, subValue)) failValidation();
      }
    }
    return validation;
  }

  async createSubmission(schemaType, submission) {
    const foundSchema = await this.getSchemaType(schemaType);
    if (this.noSchemaFound(foundSchema)) {
      return ERROR_STORAGE_UNSUCCESSFUL;
    }

    const schema = foundSchema[schemaType];

    const validation = this.handleValidationRequirements(schema, submission);

    if (!validation) return ERROR_STORAGE_UNSUCCESSFUL;

    await this.uploadSubmission(schemaType, submission);
    return STORAGE_SUCCESSFUL;
  }
}
