# Build Stage
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM node:latest
WORKDIR /app
COPY --from=build-stage /app/dist /app
RUN npm install -g serve
CMD ["serve", "-s", ".", "-p", "8080"]
EXPOSE 8080
