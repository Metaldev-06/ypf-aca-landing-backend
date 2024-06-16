import { Controller, Get, Param } from '@nestjs/common';
import { PromotionsService } from './promotions.service';

@Controller('')
export class PromotionsController {
  constructor(private readonly PromotionsService: PromotionsService) {}

  @Get()
  findAll() {
    return this.PromotionsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.PromotionsService.findOne(name);
  }
}
