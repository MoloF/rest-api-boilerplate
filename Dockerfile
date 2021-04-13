FROM node:14.15.0-alpine3.10

WORKDIR /root/site/

COPY package*.json ./

RUN npm ci --only=production

COPY ./dist ./dist
COPY ./public ./public
COPY ./views ./views
COPY ./.env.production ./

EXPOSE 8080

CMD [ "npm", "start" ]