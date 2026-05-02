import { Module } from '@nestjs/common';
import { NoteController } from './infrastructure/controllers/note.controller';
import { CreateNoteUseCase } from './application/use-cases/create-note.use-case';
import { PrismaNoteRepository } from './infrastructure/persistence/prisma-note.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { INoteRepository } from './domain/repositories/note.repository.interface';

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
  ],
})
export class NotesModule {}
