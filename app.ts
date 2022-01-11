import dotenv from 'dotenv';
import Server from './servers/server';
dotenv.config();
const server = new Server();
server.listen();