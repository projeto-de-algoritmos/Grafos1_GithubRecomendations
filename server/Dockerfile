FROM node:18-alpine

WORKDIR /server-app

COPY . .

RUN npm install -g express

RUN npm install --frozen-lockfile

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]