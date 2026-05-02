import { Controller, Post, Body } from '@nestjs/common';
import { CreateNoteUseCase } from '../../application/use-cases/create-note.use-case';
import { CreateNoteDto } from '../dtos/create-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly createNoteUseCase: CreateNoteUseCase) {}

  @Post('create')
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.createNoteUseCase.execute(createNoteDto);
  }
}
