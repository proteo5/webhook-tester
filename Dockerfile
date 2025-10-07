# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies (production only for smaller image)
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S webhook -u 1001

# Change ownership of the app directory to the webhook user
RUN chown -R webhook:nodejs /app
USER webhook

# Expose port 3000 (internal container port)
EXPOSE 3000

# Health check to ensure container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]