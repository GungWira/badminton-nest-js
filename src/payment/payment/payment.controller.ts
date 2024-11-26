import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    @Post()
    async processPayment(
        @Body() playtimeData: { playtimeIds: number[] }
    ) {
        try {
            return await this.paymentService.processPayment(playtimeData.playtimeIds)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
