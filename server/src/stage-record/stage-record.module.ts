import { Module } from '@nestjs/common';
import { StageRecordController } from './infrastructure/controllers/stage-record.controller';
import { PrismaStageRecordRepository } from './infrastructure/persistence/prisma-stage-record.repository';
import { CreateStageRecordUseCase } from './application/use-cases/create-stage-record.use-case';
import { GetStageRecordsUseCase } from './application/use-cases/get-stage-records.use-case';
import { UpdateStageRecordUseCase } from './application/use-cases/update-stage-record.use-case';

@Module({
  controllers: [StageRecordController],

  providers: [
    PrismaStageRecordRepository,

    {
      provide: CreateStageRecordUseCase,

      useFactory: (repository: PrismaStageRecordRepository) =>
        new CreateStageRecordUseCase(repository),

      inject: [PrismaStageRecordRepository],
    },

    {
      provide: GetStageRecordsUseCase,

      useFactory: (repository: PrismaStageRecordRepository) =>
        new GetStageRecordsUseCase(repository),

      inject: [PrismaStageRecordRepository],
    },

    {
      provide: UpdateStageRecordUseCase,

      useFactory: (repository: PrismaStageRecordRepository) =>
        new UpdateStageRecordUseCase(repository),

      inject: [PrismaStageRecordRepository],
    },
  ],
})
export class StageRecordModule {}
