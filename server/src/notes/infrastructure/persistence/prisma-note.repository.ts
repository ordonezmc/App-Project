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

  async update(id: string, note: Partial<Note>): Promise<Note> {
    const updatedNote = await this.prisma.bitacora.update({
      where: {
        id: id,
      },
      data: {
        lote_id: note.lote_id,
        titulo: note.titulo,
        description: note.description,
        imagen_url: note.imagen_url,
        fecha: note.fecha,
      },
    });

    return new Note(
      updatedNote.id,
      updatedNote.lote_id,
      updatedNote.titulo,
      updatedNote.description,
      updatedNote.imagen_url,
      updatedNote.fecha,
      updatedNote.created_at ?? undefined,
    );
  }
}
