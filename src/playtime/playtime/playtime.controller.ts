import { Controller, Get } from '@nestjs/common';
import { PlaytimeService } from './playtime.service';
import { DatePlay } from '@prisma/client';

@Controller('playtime')
export class PlaytimeController {
    constructor(
        private playtimeService: PlaytimeService,
    ) { }

    @Get()
    async getPlaytime(): Promise<any> {
        return this.playtimeService.getAllPlaytime()
    }

}
