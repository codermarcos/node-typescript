import http from 'http';

import { app } from './app';

const port = 3000;
const server = http.createServer(app);
const address = `http://localhost:${port}/`;

server.listen(port, console.log.bind(0, `💀 running on ${address}`));

export default server;
