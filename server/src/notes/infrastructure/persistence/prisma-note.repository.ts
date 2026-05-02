import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '../../domain/entities/note.entity';
import { INoteRepository } from '../../domain/repositories/note.repository.interface';

@Injectable()
export class PrismaNoteRepository implements INoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(note: Note): Promise<Note> {
    const createdNote = await this.prisma.bitacora.create({
      data: {
        lote_id: note.lote_id,
        titulo: note.titulo,
        description: note.description,
        imagen_url: note.imagen_url,
        fecha: note.fecha,
      },
    });

    return new Note(
      createdNote.id,
      createdNote.lote_id,
      createdNote.titulo,
      createdNote.description,
      createdNote.imagen_url,
      createdNote.fecha,
      createdNote.created_at ?? undefined,
    );
  }
}
