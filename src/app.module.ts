import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { DBModule } from './utils/db.module';

@Module({
  imports: [DBModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
