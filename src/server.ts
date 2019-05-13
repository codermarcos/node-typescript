import { AddressInfo } from 'net';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app
  .get('/',
    (req, res) => {
      res.send('Hello ts-node!');
    }
  );


server
  .listen(3000, 'localhost',
    () => {
      const address = <AddressInfo>server.address();
      console.log(`server starts at http://${address.address}:${address.port}`)
    },
  )

export default server;