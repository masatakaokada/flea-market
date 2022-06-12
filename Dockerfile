FROM node:18.3-alpine
RUN npm i -g @nestjs/cli
WORKDIR /api
