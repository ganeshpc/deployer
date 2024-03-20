# base stage
FROM node:20-alpine as base

RUN mkdir -p /workdir

WORKDIR /workdir/app

# TODO: change the root user to a non-root user
# RUN chown -R node:node /workdir/app

# USER node

# prod stage
FROM base as build

COPY package*.json  .

RUN npm install

COPY . .

RUN npm run build

# serve stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# remove default nginx static assets
RUN rm -rf ./*

# copy static assets from build stage
COPY --from=build /workdir/app/dist .

# containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]



