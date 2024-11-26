import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class MidtransService {
    private snap: midtransClient.Snap;

    constructor() {
        // Initialize Snap client with your server key and isProduction flag
        this.snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY,
        });
    }

    async createTransactionToken(transactionDetails: {
        order_id: string;
        gross_amount: number;
    }) {
        const parameter = {
            transaction_details: transactionDetails,
        };

        try {
            const transaction = await this.snap.createTransaction(parameter);
            return transaction.token;
        } catch (error) {
            throw new Error(`Midtrans Error: ${error.message}`);
        }
    }
}