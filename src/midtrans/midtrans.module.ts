import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans/midtrans.service';

@Module({
  providers: [MidtransService],
  exports: [MidtransService]
})
export class MidtransModule { }
