FROM node:22-bookworm

COPY app/ /app

WORKDIR /app

RUN npm ci

RUN npm run build

ENTRYPOINT [ "npm", "start" ]