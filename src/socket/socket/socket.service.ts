import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
    private server: Server

    setServer(server: Server) {
        this.server = server
    }

    emit(event: string, data: any) {
        if (this.server) {
            this.server.emit(event, data)
        }
    }
}
