FROM node:22-bookworm

COPY app/ /app

WORKDIR /app

ENV MONGO_URI=$MONGO_URI
ENV FE_URL=$FE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV SMTP_USERNAME=$SMTP_USERNAME
ENV SMTP_PASSWORD=$SMTP_PASSWORD
ENV MAIL_SERVICE=$MAIL_SERVICE


RUN rm -rf "app/(example)"
RUN npm ci
RUN npm i sharp
RUN npm run build

ENTRYPOINT [ "npm", "start" ]