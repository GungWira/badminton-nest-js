import { Controller, Get } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService
    ) { }

    @Get('update')
    async startSchedule(): Promise<string> {
        const schedule = this.scheduleService.updateDatePlay()
        if (schedule) {
            return 'Ok'
        }
    }
}
