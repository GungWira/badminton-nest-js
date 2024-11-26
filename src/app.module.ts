import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth/auth.guard';
import { PlaytimeModule } from './playtime/playtime.module';
import { UtilService } from './util/util/util.service';
import { ScheduleModule } from './schedule/schedule.module';
import { PaymentModule } from './payment/payment.module';
import { MidtransModule } from './midtrans/midtrans.module';
import { SocketModule } from './socket/socket.module';


@Module({
  imports: [UserModule, AuthModule, PlaytimeModule, ScheduleModule, PaymentModule, MidtransModule, SocketModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    UtilService
  ],
})
export class AppModule { }
