# syntax=docker/dockerfile:1
FROM node:18.16.0-alpine as build
RUN apk add --no-cache python3 g++ make
WORKDIR /react-frontend
COPY package*.json .
ARG REACT_APP_WEB_SOKET_BACKEND
ENV REACT_APP_WEB_SOKET_BACKEND=$REACT_APP_WEB_SOKET_BACKEND
ARG REACT_APP_WEB_SOKET_KYC
ENV REACT_APP_WEB_SOKET_KYC=$REACT_APP_WEB_SOKET_KYC
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN yarn install
COPY . .
RUN yarn run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-frontend/build /usr/share/nginx/html
