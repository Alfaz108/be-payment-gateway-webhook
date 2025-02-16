import * as fs from "fs";
import helmet from "helmet";
import * as path from "path";
import * as yaml from "js-yaml";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from "@nestjs/common";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ResponseInterceptor } from "./features/common/interceptor/response/response.interceptor";
import { AllExceptionFilter, errorConverter } from "./features/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
  });

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      enableDebugMessages: true,

      validationError: {
        target: false,
        value: false,
      },

      validateCustomDecorators: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => {
        const errorObject = errorConverter(errors);
        throw new UnprocessableEntityException(errorObject);
      },
    })
  );
  app.setGlobalPrefix("/api/v1");

  const yamlContent = fs.readFileSync(
    path.join(process.cwd(), "docs.yaml"),
    "utf-8"
  );
  const document: OpenAPIObject = yaml.load(yamlContent) as OpenAPIObject;

  SwaggerModule.setup(process.env.SWAGGER_PREFIX, app, document);

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.SERVER_PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
