FROM node:8-alpine

COPY app.js /
COPY package.json /

RUN npm install

EXPOSE 3001

CMD ["node", "app.js"]
