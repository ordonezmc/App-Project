import { Controller, Post, Get, Body, Patch, Req } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { CreateNoteUseCase } from '../../application/use-cases/create-note.use-case';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { UpdateNoteDto } from '../dtos/update-note.dto';
import { UpdateNoteUseCase } from '../../application/use-cases/update-note.use-case';
import { GetNotesUseCase } from '../../application/use-cases/get-notes.use-case';

@Controller('notes')
export class NoteController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly GetNoteUseCase: GetNotesUseCase,
  ) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.createNoteUseCase.execute(createNoteDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    return await this.GetNoteUseCase.execute(req.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.updateNoteUseCase.execute(id, updateNoteDto);
  }
}
