import { Module } from '@nestjs/common';
import { AlertController } from './infrastructure/controllers/alert.controller';
import { PrismaAlertRepository } from './infrastructure/persistence/prisma-alert.repository';
import { CreateAlertUseCase } from './application/use-cases/create-alert.use-case';
import { GetAlertsUseCase } from './application/use-cases/get-alerts.use-case';
import { GetLotAlertsUseCase } from './application/use-cases/get-lot-alerts.use-case';
import { MarkAlertAsReadUseCase } from './application/use-cases/mark-alert-as-read.use-case';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlertController],
  providers: [
    PrismaAlertRepository,
    {
      provide: CreateAlertUseCase,
      useFactory: (repo: PrismaAlertRepository) => new CreateAlertUseCase(repo),
      inject: [PrismaAlertRepository],
    },
    {
      provide: GetAlertsUseCase,
      useFactory: (repo: PrismaAlertRepository) => new GetAlertsUseCase(repo),
      inject: [PrismaAlertRepository],
    },
    {
      provide: GetLotAlertsUseCase,
      useFactory: (repo: PrismaAlertRepository) =>
        new GetLotAlertsUseCase(repo),
      inject: [PrismaAlertRepository],
    },
    {
      provide: MarkAlertAsReadUseCase,
      useFactory: (repo: PrismaAlertRepository) =>
        new MarkAlertAsReadUseCase(repo),
      inject: [PrismaAlertRepository],
    },
  ],
})
export class AlertModule {}
