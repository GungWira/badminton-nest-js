import { Module } from '@nestjs/common';
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MidtransModule } from 'src/midtrans/midtrans.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [PrismaModule, MidtransModule, SocketModule],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule { }
