import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './guards/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { CategoryEntity } from './category/category.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/product.entity';
import { UtilModule } from './util/util.module';
import { BrandEntity } from './brand/brand.entity';
import { BrandModule } from './brand/brand.module';
import { ColorModule } from './color/color.module';
import { ColorEntity } from './color/color.entity';
import { ParameterModule } from './parameter/parameter.module';
import { ParameterEntity } from './parameter/parameter.entity';
import { ApplicationModule } from './application/application.module';
import { ApplicationEntity } from './application/application.entity';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/contact.entity';
import { ServiceEntity } from './service/service.entity';
import { ServiceModule } from './service/service.module';
import { PriceModule } from './price/price.module';
import { PriceEntity } from './price/price.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: ['error'],
      // logger: 'debug',
      entities: [
        CategoryEntity,
        ProductEntity,
        BrandEntity,
        ColorEntity,
        ParameterEntity,
        ApplicationEntity,
        ContactEntity,
        ServiceEntity,
        PriceEntity,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/(.*)'],
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    UtilModule,
    BrandModule,
    ColorModule,
    ParameterModule,
    ApplicationModule,
    ContactModule,
    ServiceModule,
    PriceModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    JwtService,
    AppService,
  ],
})
export class AppModule {}
