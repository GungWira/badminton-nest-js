import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleController } from './schedule/schedule.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilModule } from 'src/util/util.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [PrismaModule, UtilModule, SocketModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
