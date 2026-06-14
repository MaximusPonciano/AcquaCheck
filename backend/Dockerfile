FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:24-alpine AS runner
ENV NODE_ENV=production
WORKDIR /usr/src/app


COPY --chown=node:node --from=builder /usr/src/app/package*.json ./


RUN npm install --omit=dev && npm cache clean --force


COPY --chown=node:node --from=builder /usr/src/app/src ./src
COPY --chown=node:node --from=builder /usr/src/app/server.js ./server.js

USER node
EXPOSE 3000

CMD ["node", "server.js"]
