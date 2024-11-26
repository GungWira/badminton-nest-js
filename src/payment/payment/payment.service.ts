import { Injectable } from '@nestjs/common';
import { MidtransService } from 'src/midtrans/midtrans/midtrans.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketService } from 'src/socket/socket/socket.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly midtransService: MidtransService,
        private readonly socketService: SocketService,
    ) { }

    async processPayment(playtimeIds: number[]) {
        const playtimes = await this.prismaService.playtime.findMany({
            where: {
                id: {
                    in: playtimeIds
                }
            }
        })

        const invalidStatus = playtimes.some(playtime => playtime.status === 'BOOKED' || playtime.status === 'PASSED' || playtime.status === 'PENDING')
        if (invalidStatus) {
            throw new Error("Gagal melakukan pemesanan, beberapa playtime tidak tersedia")
        }

        await this.prismaService.playtime.updateMany({
            where: {
                id: {
                    in: playtimeIds
                }
            },
            data: {
                status: 'PENDING'
            }
        })

        const transactionDetails = {
            order_id: `ORDER-${new Date().getTime()}`,
            gross_amount: playtimes.reduce((sum, pt) => sum + pt.price, 0)
        }
        const token = await this.midtransService.createTransactionToken(transactionDetails)

        this.socketService.emit('playtimeStatusUpdated', {
            playtimeIds,
            status: 'PENDING'
        })

        return { token }
    }
}
