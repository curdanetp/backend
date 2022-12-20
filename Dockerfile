# syntax=docker/dockerfile:1
FROM node:18.12.1-alpine as build_stage
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD [ "node", "./src/index.js" ]