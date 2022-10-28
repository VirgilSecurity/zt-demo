# syntax=docker/dockerfile:1
FROM node:16.10.0-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /react-frontend
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
