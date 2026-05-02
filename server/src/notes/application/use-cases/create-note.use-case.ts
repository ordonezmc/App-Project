import { Note } from '../../domain/entities/note.entity';
import { INoteRepository } from '../../domain/repositories/note.repository.interface';

export class CreateNoteUseCase {
  constructor(private readonly noteRepository: INoteRepository) {}

  async execute(data: {
    lote_id?: string;
    titulo: string;
    description: string;
    imagen_url?: string;
    fecha: Date;
  }): Promise<Note> {
    const newNote = new Note(
      '', // El ID lo generará la DB
      data.lote_id ?? null,
      data.titulo,
      data.description,
      data.imagen_url ?? null,
      new Date(),
    );

    // Guardar la nota en el repositorio
    return await this.noteRepository.save(newNote);
  }
}
