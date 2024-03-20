import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';

@Module({
  providers: [ServiceService],
  controllers: [ServiceController],
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
})
export class ServiceModule {}
