import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
import { UtilService } from 'src/util/util/util.service';
import { SocketService } from 'src/socket/socket/socket.service';

@Injectable()
export class ScheduleService {
    constructor(
        private prismaService: PrismaService,
        private utilService: UtilService,
        private socketService: SocketService
    ) { }

    @Cron('0 0 * * *', { timeZone: 'Asia/Makasar' })
    async updateDatePlay() {
        // get curent date
        const date = new Date()
        const curentDate = this.utilService.convertToIsoString(date)

        // count date
        const dataCount = await this.prismaService.datePlay.count({
            where: {
                AND: [
                    { date: { gte: curentDate } },
                    { date: { lt: curentDate } }
                ]
            }
        })

        if (dataCount < 7) {
            const gapDate = 7 - dataCount
            const setter = dataCount === 0 ? 0 : 1
            for (let i = setter; i <= gapDate; i++) {
                const newDate = new Date()
                newDate.setDate(date.getDate() + dataCount + i)
                const formatedDate = this.utilService.convertToIsoString(newDate)
                await this.prismaService.datePlay.create({
                    data: {
                        date: formatedDate,
                        status: 'ACTIVE',
                        courts: {
                            create: [
                                {
                                    name: "A",
                                    status: 'ACTIVE',
                                    playTimes: {
                                        createMany: {
                                            data: this.createPlaytimes(8, 20, 1, 40000, formatedDate)
                                        }
                                    }
                                },
                                {
                                    name: "B",
                                    status: 'ACTIVE',
                                    playTimes: {
                                        createMany: {
                                            data: this.createPlaytimes(8, 20, 1, 40000, formatedDate)
                                        }
                                    }
                                },
                                {
                                    name: "C",
                                    status: 'ACTIVE',
                                    playTimes: {
                                        createMany: {
                                            data: this.createPlaytimes(8, 20, 1, 40000, formatedDate)
                                        }
                                    }
                                }
                            ]
                        }
                    }
                })
            }
        }
        this.socketService.emit('datePlayUpdated', {});
    }

    @Cron('0 0 8-20 * * *', { timeZone: 'Asia/Makassar' })
    async updatePlayTime() {
        const date = new Date()
        const curentHourTime = parseInt(date.toLocaleString('id-ID', { timeZone: 'Asia/Makassar' }).split(" ")[1].split(".")[0])

        const tomorowDate = new Date()
        tomorowDate.setDate(date.getDate() + 1)

        const curentDate = this.utilService.convertToIsoString(date)

        const curentTomorrowDate = this.utilService.convertToIsoString(tomorowDate)
        const updatedPlaytimes = await this.prismaService.playtime.updateMany({
            where: {
                date: { gte: curentDate, lt: curentTomorrowDate },
                AND: {
                    start: { lte: curentHourTime }
                }
            },
            data: {
                status: 'PASSED'
            }
        })

        this.socketService.emit('playtimeUpdated', updatedPlaytimes);
    }

    createPlaytimes(start: number, end: number, gap: number, price: number, date: string) {
        const playtimes = []

        for (let i = start; i <= end; i += gap) {
            const playtime = {
                start: i,
                end: i + 1,
                price: price,
                status: 'AVALIABLE',
                date: date
            }
            playtimes.push(playtime)
        }
        return playtimes
    }

}
