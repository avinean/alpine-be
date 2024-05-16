import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';

@Module({
  providers: [PageService],
  controllers: [PageController],
  imports: [TypeOrmModule.forFeature([PageEntity])],
})
export class PageModule {}
