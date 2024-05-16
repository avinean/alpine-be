import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './core/guards/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { CategoryModule } from './custom/category/category.module';
import { AuthModule } from './core/auth/auth.module';
import { CategoryEntity } from './custom/category/category.entity';
import { ProductModule } from './custom/product/product.module';
import { ProductEntity } from './custom/product/product.entity';
import { UtilModule } from './core/util/util.module';
import { BrandEntity } from './custom/brand/brand.entity';
import { BrandModule } from './custom/brand/brand.module';
import { ColorModule } from './custom/color/color.module';
import { ColorEntity } from './custom/color/color.entity';
import { ParameterModule } from './custom/parameter/parameter.module';
import { ParameterEntity } from './custom/parameter/parameter.entity';
import { ApplicationModule } from './custom/application/application.module';
import { ApplicationEntity } from './custom/application/application.entity';
import { ContactModule } from './custom/contact/contact.module';
import { ContactEntity } from './custom/contact/contact.entity';
import { PriceModule } from './custom/price/price.module';
import { PriceEntity } from './custom/price/price.entity';
import { GalleryModule } from './core/gallery/gallery.module';
import { GalleryEntity } from './core/gallery/gallery.entity';
import { TelegramModule } from './core/telegram/telegram.module';
import { TelegramEntity } from './core/telegram/telegram.entity';
import { CmsModule } from './cms/cms/cms.module';
import { CmsEntity } from './cms/cms/cms.entity';
import { PageModule } from './cms/page/page.module';
import { PageEntity } from './cms/page/page.entity';
import { NavigationEntity } from './cms/navigation/navigation.entity';
import { NavigationModule } from './cms/navigation/navigation.module';

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
        PriceEntity,
        GalleryEntity,
        TelegramEntity,
        CmsEntity,
        PageEntity,
        NavigationEntity,
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
    PriceModule,
    GalleryModule,
    TelegramModule,
    CmsModule,
    PageModule,
    NavigationModule,
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
