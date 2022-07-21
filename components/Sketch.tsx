import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SketchProps {
  sketch: string;
}

const Sketch: React.FC<SketchProps> = ({ sketch }) => {
  const [socket, setSocket] = useState<Socket>();
  const [currentSketch, setCurrentSketch] = useState<string>(sketch);
  const [iframeKey, setIframeKey] = useState<number>();

  const socketInitializer = useCallback(async (sketch: string) => {
    await fetch(`/api/sketch/${sketch}/socket`);
    const thisSocket = io();

    thisSocket.on("connect", () => {
      console.log("connected to socket server for sketch: ", sketch);
    });

    thisSocket.on("disconnect", () => {
      console.log("disconnect from socket server for sketch: ", sketch);
    });

    thisSocket.on("change", () => {
      console.log("recieved file change event from server for sketch: ", sketch);
      setIframeKey(new Date().getTime());
    });

    setSocket(thisSocket);
  }, []);

  useEffect(() => {
    if (!socket) socketInitializer(sketch);
    if (sketch !== currentSketch) {
      if (socket) {
        socket.close();
      }
      socketInitializer(sketch);
      setCurrentSketch(sketch);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [currentSketch, sketch, socket, socketInitializer]);

  return (
    <iframe
      key={iframeKey}
      src={`/api/sketch/${sketch}`}
      className="p5-frame"
      frameBorder="0"
    ></iframe>
  );
};

export default Sketch;
