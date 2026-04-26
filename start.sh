#!/bin/bash

# Activ Globe - Start Script
# This script starts the Activ Globe server

# Check if .env exists
if [ ! -f .env ]; then
    echo "[ERROR] .env file not found!"
    echo "Please run './install.sh' first to configure the application."
    exit 1
fi

# Check if config.json exists
if [ ! -f public/config.json ]; then
    echo "[ERROR] public/config.json file not found!"
    echo "Please run './install.sh' first to configure the application."
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "[ERROR] Dependencies not installed!"
    echo "Running npm install..."
    npm install
fi

echo "========================================="
echo "Activ Globe - Starting Server"
echo "========================================="
echo ""

# Load and display configuration
PORT=$(grep PORT .env | cut -d '=' -f2)
echo "Server starting on port $PORT..."
echo "Visit: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
node main.js
