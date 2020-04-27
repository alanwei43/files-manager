FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./ 
RUN npm install --registry=https://registry.npm.taobao.org