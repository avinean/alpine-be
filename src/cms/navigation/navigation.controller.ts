import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { DeepPartial } from 'typeorm';
import { NavigationEntity } from './navigation.entity';
import { Public } from 'src/core/decorators/public.decorator';
@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Public()
  @Get()
  find() {
    return this.navigationService.findOne();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: DeepPartial<NavigationEntity>) {
    return this.navigationService.update({ id }, dto);
  }
}
