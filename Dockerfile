FROM node:18-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5000

# Healthcheck using node http request (keeps image minimal without curl)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health',res=>{if(res.statusCode!==200){console.error('unhealthy',res.statusCode);process.exit(1)}}).on('error',e=>{console.error('healthcheck error',e);process.exit(1)})"

USER node

CMD ["node", "server.js"]
