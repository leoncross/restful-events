import {Module} from '@nestjs/common';
import {DefinitionsModule} from "./definitions/definitions.module";

@Module({
  imports: [DefinitionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
