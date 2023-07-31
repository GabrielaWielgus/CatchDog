import { io, Socket } from "socket.io-client";
import { SERVER_BASE } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CustomError } from "@backend/utils/CustomError"
import { Alert } from "react-native";


export class IOSocket {
    private namespace: string;
    private socket: Socket | undefined

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    public connect = async (userID: number) : Promise<Socket> => {
        const accessToken = await AsyncStorage.getItem("accessToken")
        if(!accessToken){
            throw new Error("Access token not found")
        }
        try {
            this.socket = io(`${SERVER_BASE}/${this.namespace}`, {
                query: {userID: userID},
                extraHeaders: {Authorization: `Bearer ${await AsyncStorage.getItem("accessToken") as string}`}
            });
            this.socket.on("connect", () => console.log("Connected"))
           
            return this.socket
        } catch (err) {
            throw err;
        }
    }

    public get = (): Socket | undefined => {
        return this.socket
    }
}
