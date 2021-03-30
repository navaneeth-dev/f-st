FROM node:lts

EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

RUN npm i
CMD [ "npm", "run", "dev" ]