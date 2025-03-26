import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RidersModule } from './riders/riders.module';

@Module({
  imports: [DatabaseModule, RidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
