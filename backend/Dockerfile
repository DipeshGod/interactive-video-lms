FROM node:14.15.1
RUN mkdir -p /usr/src/app/api
RUN apt-get -y update
RUN apt-get install -y ffmpeg
WORKDIR /usr/src/app/api
COPY ./package.json ./
RUN npm install
COPY . .
RUN mkdir -p backend/src/upload/{intro/{poster,video},editor,course}
RUN npm run build
EXPOSE 5000
CMD ["npm","run","start"]


