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
        usuario_id: note.usuario_id,
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
      createdNote.usuario_id,
      createdNote.created_at ?? undefined,
    );
  }

  // async findAllByUser(userId: string): Promise<Note[]> {
  //   const bitacoras = await this.prisma.bitacora.findMany({
  //     where: { usuario_id: userId },
  //   });

  //   return bitacoras.map(this.toDomain);
  // }

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
        usuario_id: note.usuario_id,
      },
    });

    return new Note(
      updatedNote.id,
      updatedNote.lote_id,
      updatedNote.titulo,
      updatedNote.description,
      updatedNote.imagen_url,
      updatedNote.fecha,
      updatedNote.usuario_id,
      updatedNote.created_at ?? undefined,
    );
  }
}
