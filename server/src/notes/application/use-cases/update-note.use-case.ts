import { UpdateNoteDto } from 'src/notes/infrastructure/dtos/update-note.dto';
import { Note } from '../../domain/entities/note.entity';
import { INoteRepository } from '../../domain/repositories/note.repository.interface';
import { IImageStorageService } from 'src/shared/domain/repositories/image.repository.interface';

export class UpdateNoteUseCase {
  constructor(
    private readonly noteRepository: INoteRepository,
    private readonly fileStorage: IImageStorageService,
  ) {}
  async execute(id: string, data: UpdateNoteDto, file?: any): Promise<Note> {
    let finalImageUrl = data.imagen_url || null;

    if (file) {
      finalImageUrl = await this.fileStorage.uploadImage(file);
    }
    const updatedNote: Partial<Note> = {
      lote_id: data.lote_id,
      titulo: data.titulo,
      description: data.description,
      imagen_url: finalImageUrl,
      fecha: data.fecha,
      usuario_id: data.usuario_id,
    };
    return await this.noteRepository.update(id, updatedNote);
  }
}
