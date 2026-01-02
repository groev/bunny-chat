# Build Stage
FROM oven/bun:1 AS build
WORKDIR /usr/src/app

# Copy root lockfile and package.json
COPY package.json bun.lock ./

# Copy workspace package.json files
COPY server/package.json server/package.json
COPY client/package.json client/package.json

# Install dependencies
RUN bun install --frozen-lockfile

# Copy client source code
COPY client client

# Build the client
WORKDIR /usr/src/app/client
ARG VITE_API_URL
ARG VITE_AUTH_BASE_URL
RUN bun run build

# Production Stage (Nginx)
FROM nginx:alpine
COPY --from=build /usr/src/app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
