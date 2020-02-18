import {Module} from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../certs.json';

import {SubmissionsModule} from './submissions/submissions.module';
import {DefinitionsModule} from './definitions/definitions.module';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Module({
  imports: [DefinitionsModule, SubmissionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
