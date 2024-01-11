#!/bin/bash

# Function to push and deploy the backend image
deploy_backend() {
    echo "Pushing Backend Docker Image..."
    docker push gcr.io/cedar-defender-408115/on-premises-app-arm-test12:latest

    echo "Deploying to Cloud Run in region $REGION..."
    gcloud run deploy on-premises-app-arm-test12 --image gcr.io/cedar-defender-408115/on-premises-app-arm-test12:latest --region $REGION --platform managed
}

# Function to push and deploy the frontend image
deploy_frontend() {
    echo "Pushing Frontend Docker Image..."
    docker push gcr.io/cedar-defender-408115/frontend-withcon

    echo "Deploying to Cloud Run in region $REGION..."
    gcloud run deploy frontend-withcon-1 --image gcr.io/cedar-defender-408115/frontend-withcon --region $REGION --platform managed
}

# Check for correct number of arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 [Both|Frontend|Backend] [REGION]"
    exit 1
fi

# Assign arguments to variables
DEPLOY_TARGET=$1
REGION=$2

# Check the passed argument and call the respective functions
case $DEPLOY_TARGET in
    Both)
        deploy_backend
        deploy_frontend
        ;;
    Frontend)
        deploy_frontend
        ;;
    Backend)
        deploy_backend
        ;;
    *)
        echo "Invalid first argument. Please use 'Both', 'Frontend', or 'Backend'."
        exit 1
        ;;
esac
