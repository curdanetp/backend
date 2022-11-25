FROM node:18.12.1-alpine

WORKDIR /app
COPY . .
RUN yarn install --development

CMD ["node","/app/src/index.js"]