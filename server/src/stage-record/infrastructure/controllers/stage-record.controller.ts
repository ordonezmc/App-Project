import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { CreateStageRecordUseCase } from '../../application/use-cases/create-stage-record.use-case';
import { GetStageRecordsUseCase } from '../../application/use-cases/get-stage-records.use-case';
import { UpdateStageRecordUseCase } from '../../application/use-cases/update-stage-record.use-case';

@Controller('stage-records')
export class StageRecordController {
  constructor(
    private createUseCase: CreateStageRecordUseCase,

    private getUseCase: GetStageRecordsUseCase,

    private updateUseCase: UpdateStageRecordUseCase,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.createUseCase.execute(body);
  }

  @Get(':loteId')
  findByLote(@Param('loteId') loteId: string) {
    return this.getUseCase.execute(loteId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.updateUseCase.execute(id, body);
  }
}
