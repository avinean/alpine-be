import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { DeepPartial, } from 'typeorm';
import { NavigationEntity } from './navigation.entity';
@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}
  @Get()
  find() {
    return this.navigationService.findOne();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<NavigationEntity>) {
    return this.navigationService.update({ id }, dto);
  }
}
