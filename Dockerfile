# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
# We use bun since the project has bun.lock, but let's just use npm/bun if available.
# Actually, the user migrated to bun in a previous conversation.
RUN npm install -g bun

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the app and build
COPY . .
RUN bun run build

# Production stage
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
