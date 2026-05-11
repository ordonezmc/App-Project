import { Controller, Post, Get, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CreateLoteUseCase } from '../../application/use-cases/create-lote.use-case';
import { GetLotesUseCase } from '../../application/use-cases/get-lots.use-case';
import { UpdateLoteUseCase } from '../../application/use-cases/update-lot.use-case';
import {CreateLoteDTO} from '../dtos/create-lote.dto';
import { UpdateLoteDTO } from '../dtos/update-lot.dto';
import {JwtGuard} from '../../../auth/infrastructure/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('lotes')
export class LoteController {

  constructor(
    private createLote: CreateLoteUseCase,
    private getLotes: GetLotesUseCase,
    private updateLote: UpdateLoteUseCase
  ) {}

  @Post()
  create(@Body() body: CreateLoteDTO, @Req() req: any) {
    const userId = req.user.userId;
    return this.createLote.execute(body, userId);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.userId;
    return this.getLotes.execute(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateLoteDTO) {
    return this.updateLote.execute(id, body);
  }
}