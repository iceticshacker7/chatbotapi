// src/app.module.ts

import { Module } from '@nestjs/common';
import { ChatController } from './controllers/ChatController';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [],
})
export class AppModule {}
