import { Module } from '@nestjs/common';
import { NoteController } from './infrastructure/controllers/note.controller';
import { CreateNoteUseCase } from './application/use-cases/create-note.use-case';
import { PrismaNoteRepository } from './infrastructure/persistence/prisma-note.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { INoteRepository } from './domain/repositories/note.repository.interface';
import { UpdateNoteUseCase } from './application/use-cases/update-note.use-case';
import { GetNotesUseCase } from './application/use-cases/get-notes.use-case';

@Module({
  controllers: [NoteController],
  providers: [
    PrismaService,
    {
      provide: 'INoteRepository',
      useClass: PrismaNoteRepository,
    },
    {
      provide: CreateNoteUseCase,
      inject: ['INoteRepository'],
      useFactory: (repository: INoteRepository) =>
        new CreateNoteUseCase(repository),
    },
    {
      provide: GetNotesUseCase,
      inject: ['INoteRepository'],
      useFactory: (repository: INoteRepository) =>
        new GetNotesUseCase(repository),
    },
    {
      provide: UpdateNoteUseCase,
      inject: ['INoteRepository'],
      useFactory: (repository: INoteRepository) =>
        new UpdateNoteUseCase(repository),
    },
  ],
})
export class NotesModule {}
