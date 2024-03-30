import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsEntity } from './cms.entity';

@Module({
  providers: [CmsService],
  controllers: [CmsController],
  imports: [TypeOrmModule.forFeature([CmsEntity])],
})
export class CmsModule {}
