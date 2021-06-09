FROM node:13.12.0-alpine as build
LABEL authors="hsaiz@ikerlan.es"

WORKDIR /app

# install app dependencies
COPY ./package.json package.json
RUN npm install

COPY ./public public
COPY ./src src
COPY ./jsconfig.json jsconfig.json
#Necesary to resolve JS absolute import paths during NPM BUILD

RUN npm run build

#production environment
FROM nginx:stable-alpine
LABEL authors="hsaiz@ikerlan.es"

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/server.conf

WORKDIR /usr/share/nginx/html
COPY ./.env ./.env
COPY ./env.sh .

EXPOSE 80

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh 

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
