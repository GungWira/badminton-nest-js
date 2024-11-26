import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketService } from './socket/socket/socket.service';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpServer = createServer(app.getHttpAdapter().getInstance())
  const io = new Server(httpServer)

  const socketService = app.get(SocketService)
  socketService.setServer(io)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })

  await app.listen(3000);
  app.use(cookieParser());

  io.listen(httpServer)
}
bootstrap();
