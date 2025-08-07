# ---------- Base Stage ----------
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm install

# ---------- Build Stage ----------
FROM base AS builder

# Copy full project and build it
COPY . .
RUN npx prisma generate
ENV NEXT_DISABLE_ESLINT_PLUGIN=true
RUN npm run build

# ---------- Production Runner Stage ----------
FROM node:20-alpine AS runner
WORKDIR /app

# Only copy production dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy build artifacts and necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

# Prisma Client (generated in node_modules)
# NOTE: If you want to run Prisma in prod (like `db push`), you might also need the schema
COPY --from=builder /app/.env ./

# Expose Next.js default port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
