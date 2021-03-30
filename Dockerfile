FROM node:lts

EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY . .

RUN npm i --production
RUN npm run build
CMD [ "npm", "start" ]