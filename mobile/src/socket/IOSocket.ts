import { io, Socket } from "socket.io-client";
import { SERVER_BASE } from "../config/api";

export class IOSocket {
    private namespace: string;
    private socket: Socket | undefined;

    constructor(nms: string) {
        this.namespace = nms;
    }

    public connect = async (): Promise<void> => {
        try {
            this.socket = io(`${SERVER_BASE}/${this.namespace}`);
            await new Promise<void>((resolve) => {
                this.socket?.on("connect", () => {
                    console.log("Socket connected");
                    resolve();
                });
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public get = (): Socket | undefined => {
        return this.socket;
    }
}
