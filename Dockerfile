# 1️⃣ Base stage for installing dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

# Copy package.json and lockfile separately to optimize caching
COPY package.json package-lock.json ./

# Install only dependencies (without running scripts)
RUN npm ci --only=production

# 2️⃣ Build stage for compiling Next.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copy the installed dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build

# 3️⃣ Final stage for running the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3000

# Run the Next.js server instead of 'serve'
CMD ["npm", "start"]
