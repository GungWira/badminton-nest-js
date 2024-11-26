import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
    convertToIsoString(objs: Date) {

        const obj = objs.toLocaleString('en-US', { timeZone: 'Asia/Makassar', hour12: false })
        const year: number = parseInt(obj.split(",")[0].split("/")[2])
        const month: number = parseInt(obj.split(",")[0].split("/")[0]) - 1
        const day: number = parseInt(obj.split(",")[0].split("/")[1])

        const newDate = new Date(year, month, day, 8, 0, 0)
        return newDate.toISOString()
    }
}
