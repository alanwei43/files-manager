FROM alanway/files-manager-dep:latest

WORKDIR /app
COPY src/ ./src
COPY static/ ./static
RUN npm run build && mkdir /data
EXPOSE 8080

CMD [ "node", "dist/server.js", "-p", "8080", "-d", "/data" ]