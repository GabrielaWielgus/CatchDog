import { Socket } from "socket.io"
import { events } from "../index"

export const handleWalkStart = (socket:Socket) => {
    socket.broadcast.emit(events.map.walkStart, {
        foo: "bar",
        msg: "data here"
    })
}