FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g vite

RUN ls

RUN npm install --frozen-lockfile

RUN npm run build

EXPOSE 5173
