# Use a specific version of node to prevent future incompatibilities
FROM node:20.10.0 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a separate stage to discard build dependencies
FROM node:20.10.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# The application listens on `PORT` environment variable by default
EXPOSE $PORT
EXPOSE 8080

# Define the command to run the app
ENTRYPOINT []
CMD ["node", "dist/main"]
