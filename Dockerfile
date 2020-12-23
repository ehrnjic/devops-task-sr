FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]