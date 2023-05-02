FROM node:18-alpine

WORKDIR /front-app

COPY . .

RUN npm install -g vite

RUN npm install --frozen-lockfile

RUN npm run build

EXPOSE 5173

CMD ["npx", "vite"]