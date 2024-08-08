FROM node:22-bookworm

COPY app/ /app

WORKDIR /app

ENV MONGO_URI=$MONGO_URI
ENV FE_URL=$FE_URL
ENV SECRET=$_SECRET

RUN rm -rf "app/(example)"
RUN npm ci
RUN npm i sharp
RUN npm run build

ENTRYPOINT [ "npm", "start" ]