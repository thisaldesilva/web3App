#!/bin/bash

# Function to build the backend image
build_backend() {
    echo "Building Backend Docker Image..."
    docker buildx build -t gcr.io/cedar-defender-408115/on-premises-app-arm-test12:latest -f ../backend/Dockerfile ../backend/ --platform linux/amd64
}

# Function to build the frontend image
build_frontend() {
    echo "Building Frontend Docker Image..."
    docker buildx build -t gcr.io/cedar-defender-408115/frontend-withcon -f ../frontend/Dockerfile ../frontend/ --platform linux/amd64
}

# Check the passed argument and call the respective functions
case $1 in
    Both)
        build_backend
        build_frontend
        ;;
    Frontend)
        build_frontend
        ;;
    Backend)
        build_backend
        ;;
    *)
        echo "Invalid argument. Please use 'Both', 'Frontend', or 'Backend'."
        exit 1
        ;;
esac
