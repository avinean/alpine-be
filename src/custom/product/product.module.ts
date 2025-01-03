import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { PriceModule } from 'src/custom/price/price.module';
import { PriceEntity } from 'src/custom/price/price.entity';
import { UtilModule } from 'src/core/util/util.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity, PriceEntity]),
    PriceModule,
    UtilModule,
  ],
})
export class ProductModule {}
