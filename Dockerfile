FROM node:slim

WORKDIR /srv/app

COPY package*.json ./

RUN npm install --registry https://repo.huaweicloud.com/repository/npm/

COPY src/* ./

EXPOSE 65507

CMD node main.js
