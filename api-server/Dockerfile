# base stage
FROM node:20-alpine as base

# TODO: change the root user to a non-root user
# USER node

RUN mkdir -p /workdir

WORKDIR /workdir/app

# prod state
FROM base as prod

COPY package*.json  .

RUN npm install --production

COPY prisma prisma

RUN npx prisma generate

COPY . . 

RUN npm run build

EXPOSE 9000

CMD ["node", "dist/index.js"]