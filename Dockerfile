FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./ 
RUN npm install --registry=https://registry.npm.taobao.org
COPY src/ ./src
COPY static/ ./static
RUN npm run build && mkdir /data
EXPOSE 8080

CMD [ "node", "dist/server.js", "-p", "8080", "-d", "/data" ]