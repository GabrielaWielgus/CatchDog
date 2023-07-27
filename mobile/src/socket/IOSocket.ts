import { io, Socket } from "socket.io-client";
import { SERVER_BASE } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CustomError } from "@backend/utils/CustomError"
import { Alert } from "react-native";


export class IOSocket {
    private namespace: string;
    private socket: Socket | undefined

    constructor(nms: string) {
        this.namespace = nms;
    }

    public connect = async (userID: number): Promise<void> => {
        try {
            this.socket = io(`${SERVER_BASE}/${this.namespace}`, {
                query: {
                    userID: userID
                },
                extraHeaders: {
                    Authorization: `Bearer ${await AsyncStorage.getItem("token") as string}`
                }
            });
            await new Promise<void>((resolve) => {
                this.socket?.on("connect", () => {
                    resolve();
                });

                this.socket?.on("connect_error", (err) => {
                    Alert.alert(
                        'Cannot connect to maps',
                        '',
                        [
                          {text: 'Cancel', style: "cancel"}
                        ],
                    )
                })
            });
        } catch (err) {
            throw err;
        }
    }

    public get = (): Socket | undefined => {
        if(!this.socket || !this.socket.connected){
            return undefined
        }
        return this.socket;
    }
}
