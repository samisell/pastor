# Multi-stage Dockerfile for Next.js + Bun + Prisma + Caddy deployment
# Optimized for Coolify VPS

# Stage 1: Build stage
FROM oven/bun:1-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN bun run db:generate

# Build the Next.js application
RUN bun run build

# Stage 2: Runtime stage
FROM oven/bun:1-alpine AS runtime

# Install runtime dependencies
RUN apk add --no-cache \
    libc6-compat \
    caddy \
    sqlite \
    && rm -rf /var/cache/apk/*

# Create app user and directories
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 \
    && mkdir -p /app /data/db /data/caddy \
    && chown -R nextjs:nodejs /app /data

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./next-service-dist/
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./next-service-dist/.next/static/
COPY --from=builder --chown=nextjs:nodejs /app/public ./next-service-dist/public/
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma/

# Copy package files for Prisma
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules/

# Create Caddyfile for Coolify deployment
RUN cat > Caddyfile << 'EOF'
:3001 {
    @transform_port_query {
        query XTransformPort=*
    }

    handle @transform_port_query {
        reverse_proxy localhost:{query.XTransformPort} {
            header_up Host {host}
            header_up X-Forwarded-For {remote_host}
            header_up X-Forwarded-Proto {scheme}
            header_up X-Real-IP {remote_host}
        }
    }

    handle {
        reverse_proxy localhost:3001 {
            header_up Host {host}
            header_up X-Forwarded-For {remote_host}
            header_up X-Forwarded-Proto {scheme}
            header_up X-Real-IP {remote_host}
        }
    }
}
EOF

# Create start script
RUN cat > start.sh << 'EOF'
#!/bin/sh
set -e

echo "🚀 Starting Next.js application with Prisma and Caddy..."

# Set environment variables
export NODE_ENV=production
export PORT=3001
export HOSTNAME=0.0.0.0
export DATABASE_URL="file:/data/db/custom.db"

# Initialize database if it doesn't exist
if [ ! -f "/data/db/custom.db" ]; then
    echo "🗄️ Initializing database..."
    mkdir -p /data/db
    bunx prisma migrate deploy
    echo "✅ Database initialized"
fi

# Start Next.js in background
echo "🚀 Starting Next.js server..."
cd /app/next-service-dist
bun server.js &
NEXT_PID=$!

# Wait for Next.js to start
sleep 3

# Check if Next.js started successfully
if ! kill -0 $NEXT_PID 2>/dev/null; then
    echo "❌ Next.js failed to start"
    exit 1
fi

echo "✅ Next.js server started on port 3001"

# Start Caddy in foreground
echo "🚀 Starting Caddy reverse proxy..."
cd /app
exec caddy run --config Caddyfile --adapter caddyfile
EOF

# Make start script executable
RUN chmod +x start.sh

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD bun -e "fetch('http://localhost:3001').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start the application
CMD ["./start.sh"]