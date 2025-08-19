FROM node:22-alpine AS base
WORKDIR /usr/src

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --ignore-scripts

FROM base AS build
COPY . .
RUN npm run build          # gera ./dist

FROM node:22-alpine AS production
WORKDIR /usr/src

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

COPY --from=base /usr/src/node_modules ./node_modules
COPY --from=build /usr/src/dist ./dist
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
