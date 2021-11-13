FROM node:14.15.1 as builder
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/client/build /usr/share/nginx/html


