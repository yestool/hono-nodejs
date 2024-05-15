FROM node:20-slim AS base

FROM base AS builder

ARG USE_CHINA_MIRROR=false
ENV USE_CHINA_MIRROR=${USE_CHINA_MIRROR}
RUN if [ "${USE_CHINA_MIRROR}" = "true" ]; then \
        npm cache clean --force; \
        npm config set registry https://registry.npmmirror.com; \
    fi

WORKDIR /app

COPY . .


RUN npm install -g npm@latest
RUN npm ci  && npm run build  && npm prune --production

 
FROM base AS runner
WORKDIR /app


COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000

CMD ["node", "/app/dist/index.js"]