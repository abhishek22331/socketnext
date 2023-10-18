// import { NextApiRequest, NextApiResponse } from 'next';
// import { Server, Socket } from 'socket.io';
// import http from 'http';

// let io: Server;

// export default async (req: NextApiRequest, res: NextApiResponse) => {

//   if (!io) {
//     const httpServer = http.createServer((req, res) => {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end('Socket.io server');
//     });

//     const io = require("socket.io")(httpServer, {
//       cors: {
//         origin: `*`,
//         methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//       }
//     });

//     io.on('connect', (socket: Socket) => {
//       console.log(`Socket ${socket.id} connected`);

//       socket.on('message', (message: string) => {
//         console.log(`Message from ${socket.id}: ${message}`);
//       })

//       socket.on('disconnect', () => {
//         console.log(`Socket ${socket.id} disconnected`);
//       });
//     });

//     httpServer.listen(8000); 
//   }

//   res.status(200).json({ message: 'Socket.io server running' });
// };