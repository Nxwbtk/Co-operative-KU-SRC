FROM node:22-bookworm

COPY app/ /app

WORKDIR /app

RUN rm -rf "app/(example)"
RUN npm ci
RUN npm i sharp
RUN npm run build

ENTRYPOINT [ "npm", "start" ]