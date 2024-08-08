FROM node:22-bookworm

COPY app/ /app

WORKDIR /app

ARG MONGO_URI
ARG FE_URL
ARG NEXT_AUTH_SECRET

MONGO_URI=$MONGO_URI
FE_URL=$FE_URL
NEXT_AUTH_SECRET=$NEXT_AUTH_SECRET

RUN rm -rf "app/(example)"
RUN npm ci
RUN npm i sharp
RUN npm run build

ENTRYPOINT [ "npm", "start" ]