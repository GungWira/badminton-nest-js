import { Injectable } from '@nestjs/common';
import { Court, Playtime } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilService } from 'src/util/util/util.service';

@Injectable()
export class PlaytimeService {
    constructor(
        private prismaService: PrismaService,
        private utilService: UtilService
    ) { }

    async getAllPlaytime() {
        const date = new Date()
        const curentDate = this.utilService.convertToIsoString(date)
        const maxDay = new Date()
        maxDay.setDate(maxDay.getDate() + 7)
        const curentMaxDay = this.utilService.convertToIsoString(maxDay)

        const datas = await this.prismaService.datePlay.findMany({
            where: {
                status: 'ACTIVE',
                AND: [
                    { date: { gte: curentDate } },
                    { date: { lt: curentMaxDay } }
                ]
            },
            select: {
                date: true,
                courts: {
                    select: {
                        name: true,
                        status: true,
                        datePlay: true,
                        playTimes: {
                            select: {
                                id: true,
                                start: true,
                                end: true,
                                price: true,
                                status: true,
                                date: true,
                            }
                        }
                    }
                }
            }
        })
        return {
            message: 'Data successfully fetched',
            data: datas
        }
    }

    async getPlaytimeById(id: number): Promise<Playtime | string> {
        const data = await this.prismaService.playtime.findUnique({
            where: {
                id
            }
        })

        if (!data) {
            return "Invalid playtime ID"
        }
        return data
    }

    async getCourtById(id: number): Promise<Court | string> {
        const data = await this.prismaService.court.findUnique({
            where: {
                id
            }
        })

        if (!data) {
            return "Invalid playtime ID"
        }
        return data
    }
}
