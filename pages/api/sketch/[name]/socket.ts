import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import chokidar from "chokidar";
import { resolve } from "path";

type SocketWithServer = Socket & { server: { io: Server } };

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { name },
  } = req;

  const socket = res.socket ? (res.socket as SocketWithServer) : null;
  if (socket?.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    if (socket?.server) {
      const io = new Server(socket.server as any);
      socket.server.io = io;

      const resolvedPath = resolve(`${process.env.P5_DIR}/${name}`);
      chokidar.watch(resolvedPath).on("change", () => {
        console.log(`${resolvedPath} has been changed, sending reload event`);
        socket?.server.io.emit("change");
      });
    }
  }

  res.end();
};

export default SocketHandler;
