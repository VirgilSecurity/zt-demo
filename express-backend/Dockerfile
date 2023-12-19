# syntax=docker/dockerfile:1
FROM node:18.16.0-alpine as build
RUN apk add --no-cache python3 g++ make
WORKDIR /express-backend
COPY package.json .
ARG KYC_HOST
ENV KYC_HOST=$KYC_HOST
ARG REP_URL
ENV REP_URL=$REP_URL
RUN yarn install
COPY . .
RUN yarn run build
CMD ["node", "dist/index.js"]
EXPOSE 3002
