import { Module } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationEntity } from './navigation.entity';

@Module({
  providers: [NavigationService],
  controllers: [NavigationController],
  imports: [TypeOrmModule.forFeature([NavigationEntity])],
})
export class NavigationModule {}
