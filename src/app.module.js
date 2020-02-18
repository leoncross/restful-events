import {Module} from '@nestjs/common';
import {DefinitionsModule} from './definitions/definitions.module';

import * as serviceAccount from '../certs.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Module({
  imports: [DefinitionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
