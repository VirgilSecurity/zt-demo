# syntax=docker/dockerfile:1
FROM node:16.10.0-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /express-backend
COPY package.json .
RUN yarn install
COPY . .
RUN yarn run build
CMD ["node", "dist/index.js"]
EXPOSE 3002
