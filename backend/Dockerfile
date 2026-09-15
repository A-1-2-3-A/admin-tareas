FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://appuser:apppass@localhost:5432/appdb" npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]