#!/bin/bash

# Activ Globe - Installation Script
# This script sets up the project by installing dependencies and configuring environment variables

set -e

echo "========================================="
echo "Activ Globe - Installation Setup"
echo "========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "[OK] Node.js version: $(node --version)"
echo ""

# Install npm dependencies
echo "Installing npm dependencies..."
npm install
echo "[OK] Dependencies installed"
echo ""

# Configure .env file
echo "========================================="
echo "Configuring .env file"
echo "========================================="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "[WARN] .env file already exists."
    read -p "Do you want to reconfigure it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping .env configuration"
        echo ""
    else
        configure_env=true
    fi
else
    configure_env=true
fi

if [ "$configure_env" = true ]; then
    # Prompt for GEMINI_API_KEY
    echo "GEMINI_API_KEY"
    echo "   Get your API key from: https://makersuite.google.com/app/apikey"
    read -p "   Enter your Gemini API Key: " GEMINI_API_KEY
    
    # Prompt for PORT
    echo ""
    echo "PORT"
    read -p "   Enter the port to run the server on (default: 80): " PORT
    PORT=${PORT:-80}
    
    # Prompt for API_TOKEN
    echo ""
    echo "API_TOKEN"
    echo "   This token is used to authenticate API requests"
    read -p "   Enter your API Token (default: banan): " API_TOKEN
    API_TOKEN=${API_TOKEN:-banan}
    
    # Write to .env
    cat > .env << EOF
GEMINI_API_KEY="$GEMINI_API_KEY"
PORT=$PORT
API_TOKEN="$API_TOKEN"
EOF
    
    echo ""
    echo "[OK] .env file created"
fi

echo ""

# Configure config.json file
echo "========================================="
echo "Configuring /public/config.json"
echo "========================================="
echo ""

if [ -f public/config.json ]; then
    echo "[WARN] config.json file already exists."
    read -p "Do you want to reconfigure it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping config.json configuration"
        echo ""
    else
        configure_config=true
    fi
else
    configure_config=true
fi

if [ "$configure_config" = true ]; then
    # Use the API_TOKEN from .env if it exists
    if [ -z "$API_TOKEN" ] && [ -f .env ]; then
        API_TOKEN=$(grep API_TOKEN .env | cut -d '=' -f2 | tr -d '"')
    fi
    
    echo "API_TOKEN"
    read -p "   Enter your API Token (default: $API_TOKEN): " CONFIG_API_TOKEN
    CONFIG_API_TOKEN=${CONFIG_API_TOKEN:-$API_TOKEN}
    
    # Write to config.json
    cat > public/config.json << EOF
{
	"API_TOKEN": "$CONFIG_API_TOKEN"
}
EOF
    
    echo ""
    echo "[OK] config.json file created"
fi

echo ""
echo "========================================="
echo "Configuring port 80 access"
echo "========================================="
echo ""

# Check if port 80 is configured
if [ "$PORT" = "80" ] || grep -q "^PORT=80$" .env 2>/dev/null; then
    echo "[WARN] Port 80 requires elevated privileges."
    echo ""
    echo "Options to run on port 80 without sudo:"
    echo "1. Use setcap to allow Node.js to bind to port 80 (requires sudo once)"
    echo "2. Use a different port (e.g., 3000, 8080)"
    echo "3. Use a reverse proxy (Nginx/Apache) on port 80"
    echo ""
    read -p "Would you like to enable port 80 access for current user? (y/n) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Find Node.js binary path
        NODE_BIN=$(which node)
        if [ -z "$NODE_BIN" ]; then
            echo "[ERROR] Node.js binary not found"
        else
            echo "Found Node.js at: $NODE_BIN"
            echo ""
            echo "Running: sudo setcap cap_net_bind_service=+ep $NODE_BIN"
            echo "You may be prompted for your sudo password..."
            echo ""
            
            if sudo setcap cap_net_bind_service=+ep "$NODE_BIN" 2>/dev/null; then
                echo "[OK] Successfully enabled port 80 access for: $NODE_BIN"
                echo "[OK] Non-sudo users can now bind to port 80"
            else
                echo "[ERROR] Failed to set capabilities. You may need to:"
                echo "   - Run with sudo: sudo -u \$(whoami) npm start"
                echo "   - Or change PORT to a higher number in .env"
                echo "   - Or set it up in Docker (no sudo needed)"
            fi
        fi
    else
        echo "[WARN] Note: You'll need to either:"
        echo "   - Use 'sudo npm start' to run on port 80"
        echo "   - Change PORT to a higher number (e.g., 3000, 8080) in .env"
        echo "   - Use Docker (no sudo required)"
    fi
else
    echo "[OK] Configured port is not 80, no special privileges needed"
fi

echo ""
echo "========================================="
echo "[SUCCESS] Installation completed successfully!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Start the server: npm start"
echo "2. Or use: ./start.sh"
echo "3. Or deploy with Docker: docker-compose up -d"
echo ""

