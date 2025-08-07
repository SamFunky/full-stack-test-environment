# Base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# If you're using Prisma, generate the client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on (typically 3000)
EXPOSE 8080
EXPOSE 3000

# Start the app
CMD ["npm", "start"]