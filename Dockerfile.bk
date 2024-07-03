FROM node:18-alpine AS base

# Check the Node.js Docker documentation for reasons to install libc6-compat
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Installing pnpm, sharp, and dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && \
    if [ -f pnpm-lock.yaml ]; then \
      pnpm i --frozen-lockfile && \
      pnpm add sharp; \
    else \
      echo "pnpm lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
# Install pnpm again for this stage
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_WORDPRESS_API_URL
ENV NEXT_PUBLIC_WORDPRESS_API_URL=$NEXT_PUBLIC_WORDPRESS_API_URL
# Uncomment the following line if you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line if you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Leverage output traces to reduce image size (Next.js specific optimization)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
