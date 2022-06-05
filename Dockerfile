FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000


ENV TYPEORM_CONNECTION=mysql
ENV TYPEORM_HOST=localhost
ENV TYPEORM_PORT=3306
ENV TYPEORM_USERNAMME=nest
ENV TYPEORM_PASSWORD=nest
ENV TYPEORM_DATABASE=nest

WORKDIR /usr/app/dist

CMD ["npm","run", "start:prod"]