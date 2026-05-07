import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/note.module';
import { LoteModule } from './lots/lot.module';

@Module({
  imports: [AuthModule, NotesModule, LoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
