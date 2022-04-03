FROM node:12.18.3

RUN mkdir /app

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["sh","-c","npm run start"]

