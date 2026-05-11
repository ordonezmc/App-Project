import { UpdateNoteDto } from 'src/notes/infrastructure/dtos/update-note.dto';
import { Note } from '../../domain/entities/note.entity';
import { INoteRepository } from '../../domain/repositories/note.repository.interface';

export class UpdateNoteUseCase {
  constructor(private readonly noteRepository: INoteRepository) {}
  async execute(id: string, data: UpdateNoteDto): Promise<Note> {
    const updatedNote: Partial<Note> = {
      lote_id: data.lote_id,
      titulo: data.titulo,
      description: data.description,
      imagen_url: data.imagen_url,
      fecha: data.fecha,
      usuario_id: data.usuario_id,
    };
    return await this.noteRepository.update(id, updatedNote);
  }
}
