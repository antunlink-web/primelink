FROM oven/bun:1.4.2 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --registry=https://registry.npmjs.org
COPY . .
RUN bun run build

FROM nginx:alpine
ARG BUILD_COMMIT
LABEL org.opencontainers.image.title="primelink.hr" \
      org.opencontainers.image.revision="${BUILD_COMMIT}"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist/static-routes.map /etc/nginx/primelink-static-routes.map
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:3000/ || exit 1
