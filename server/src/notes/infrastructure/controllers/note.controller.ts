import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Req,
  Delete,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { CreateNoteUseCase } from '../../application/use-cases/create-note.use-case';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { UpdateNoteDto } from '../dtos/update-note.dto';
import { UpdateNoteUseCase } from '../../application/use-cases/update-note.use-case';
import { GetNotesUseCase } from '../../application/use-cases/get-notes.use-case';
import { GetNoteUseCase } from 'src/notes/application/use-cases/get-note.use-case';
import { DeleteNoteUseCase } from 'src/notes/application/use-cases/delete-note.use-case';

@Controller('notes')
export class NoteController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly getNotesUseCase: GetNotesUseCase,
    private readonly getNoteUseCase: GetNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.createNoteUseCase.execute(createNoteDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    return await this.getNotesUseCase.execute(req.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getNoteUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.updateNoteUseCase.execute(id, updateNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteNoteUseCase.execute(id);
  }
}
