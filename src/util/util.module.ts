import { Module } from '@nestjs/common';
import { UtilService } from './util/util.service';

@Module({
  providers: [UtilService],
  exports: [UtilService]
})
export class UtilModule { }
