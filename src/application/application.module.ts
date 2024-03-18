import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';

@Module({
  providers: [ApplicationService],
  controllers: [ApplicationController],
  imports: [TypeOrmModule.forFeature([ApplicationEntity])]
})
export class ApplicationModule {}
