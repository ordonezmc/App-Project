import { Module } from '@nestjs/common';
import { NoteController } from './infrastructure/controllers/note.controller';
import { CreateNoteUseCase } from './application/use-cases/create-note.use-case';
import { PrismaNoteRepository } from './infrastructure/persistence/prisma-note.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { INoteRepository } from './domain/repositories/note.repository.interface';
import { UpdateNoteUseCase } from './application/use-cases/update-note.use-case';
import { GetNotesUseCase } from './application/use-cases/get-notes.use-case';
import { GetNoteUseCase } from './application/use-cases/get-note.use-case';
import { DeleteNoteUseCase } from './application/use-cases/delete-note.use-case';

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
      provide: GetNoteUseCase,
      inject: ['INoteRepository'],
      useFactory: (repository: INoteRepository) =>
        new GetNoteUseCase(repository),
    },
    {
      provide: UpdateNoteUseCase,
      inject: ['INoteRepository'],
      useFactory: (repository: INoteRepository) =>
        new UpdateNoteUseCase(repository),
    },
    {
      provide: DeleteNoteUseCase,
      inject: ['INoteRepository'],
      useFactory: (repository: INoteRepository) =>
        new DeleteNoteUseCase(repository),
    },
  ],
})
export class NotesModule {}
