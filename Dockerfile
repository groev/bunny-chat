# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Copy root lockfile and package.json
COPY package.json bun.lock ./

# Copy workspace package.json files
COPY server/package.json server/package.json
COPY client/package.json client/package.json

# Install dependencies (frozen lockfile ensures consistency)
RUN bun install --frozen-lockfile

# Copy the server source code
COPY server server

# Set working directory to server
WORKDIR /usr/src/app/server

# Generate Prisma Client
RUN bun run postinstall

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
