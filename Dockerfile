FROM node:12-alpine

RUN mkdir /api

COPY package.json /api/package.json
COPY package-lock.json /api/package-lock.json

WORKDIR /api

RUN npm install

COPY . .

RUN npm run build

CMD node build/server.js
