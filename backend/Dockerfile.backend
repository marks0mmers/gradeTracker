FROM node:12.20.1-alpine3.12

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "prod"]