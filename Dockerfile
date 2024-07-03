
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
FROM base AS deps
COPY package.json yarn.lock ./
RUN npm install -g yarn && \
    if [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile && \
      yarn add sharp; \
    else \
      echo "Yarn lockfile not found." && exit 1; \
    fi
FROM base AS builder
WORKDIR /app
RUN npm install -g yarn
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_WORDPRESS_API_URL
ENV NEXT_PUBLIC_WORDPRESS_API_URL=$NEXT_PUBLIC_WORDPRESS_API_URL
RUN yarn build
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
# Start the application using the standalone server.js file
CMD ["node", ".next/standalone/server.js"]
