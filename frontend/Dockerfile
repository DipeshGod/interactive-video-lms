FROM node:14.15.1 as builder
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
RUN npm install --global pm2
COPY ./package.json ./
RUN npm install --production
COPY . .
RUN npm install --save-dev typescript
RUN npm run build
EXPOSE 3000
CMD ["pm2-runtime", "npm","--","start"]



