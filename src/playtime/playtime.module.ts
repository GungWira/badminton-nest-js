import { Module } from '@nestjs/common';
import { PlaytimeService } from './playtime/playtime.service';
import { PlaytimeController } from './playtime/playtime.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilModule } from 'src/util/util.module';

@Module({
  imports: [PrismaModule, UtilModule],
  providers: [PlaytimeService],
  controllers: [PlaytimeController],
  exports: [PlaytimeService],
})
export class PlaytimeModule { }
