# base stage
FROM node:20-alpine as base

WORKDIR /workdir/app

# prod state
FROM base as prod

COPY package*.json  .

RUN npm install --production

COPY . . 

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/index.js"]