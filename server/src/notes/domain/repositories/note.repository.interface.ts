import { Note } from '../entities/note.entity';

export interface INoteRepository {
  save(note: Note): Promise<Note>;
}
