import { Controller, Get, Put, Post, Param, Body } from '@nestjs/common';
import { CreateAlertUseCase } from '../../application/use-cases/create-alert.use-case';
import { GetAlertsUseCase } from '../../application/use-cases/get-alerts.use-case';
import { GetLotAlertsUseCase } from '../../application/use-cases/get-lot-alerts.use-case';
import { MarkAlertAsReadUseCase } from '../../application/use-cases/mark-alert-as-read.use-case';

@Controller('alerts')
export class AlertController {
  constructor(
    private createUseCase: CreateAlertUseCase,
    private getAlertsUseCase: GetAlertsUseCase,
    private getLotAlertsUseCase: GetLotAlertsUseCase,
    private markAsReadUseCase: MarkAlertAsReadUseCase,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.createUseCase.execute(body);
  }

  @Get()
  findAll() {
    return this.getAlertsUseCase.execute();
  }

  @Get('lot/:loteId')
  findByLote(
    @Param('loteId')
    loteId: string,
  ) {
    return this.getLotAlertsUseCase.execute(loteId);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.markAsReadUseCase.execute(id);
  }
}
