import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateNoteUseCase } from '../../application/use-cases/create-note.use-case';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { JwtGuard } from 'src/auth/infrastructure/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly createNoteUseCase: CreateNoteUseCase) {}

  @Post('create')
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.createNoteUseCase.execute(createNoteDto);
  }
}
