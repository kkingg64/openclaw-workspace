FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build

EXPOSE 3000 3001

CMD ["sh", "-c", "node server/index.js & npm start"]
