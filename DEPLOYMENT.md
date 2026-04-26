# Activ Globe - Deployment Guide

## Overview

This project includes automated setup scripts, Docker configuration, and multiple deployment options for easy installation and deployment.

## Files Created

### 1. **install.sh** - Interactive Installation Script
- **Purpose**: Automates the setup process
- **What it does**:
  - Checks if Node.js is installed
  - Installs npm dependencies via `npm install`
  - Interactively prompts for `.env` configuration:
    - `GEMINI_API_KEY` (Google Gemini API key)
    - `PORT` (server port, default: 80)
    - `API_TOKEN` (authentication token)
  - Interactively prompts for `/public/config.json` configuration:
    - `API_TOKEN` (synced with .env)
  - Creates/updates configuration files

### 2. **start.sh** - Server Startup Script
- **Purpose**: Safely starts the application
- **What it does**:
  - Validates `.env` and `config.json` exist
  - Auto-installs dependencies if `node_modules` is missing
  - Displays server configuration
  - Starts the Node.js server
  - Shows access URL

### 3. **Dockerfile** - Docker Container Configuration
- **Purpose**: Packages the application as a Docker container
- **Key features**:
  - Multi-stage build (optimized image size)
  - Node.js 20 Alpine Linux (lightweight base)
  - Non-root user execution (security)
  - Health checks every 30s
  - Graceful shutdown handling with dumb-init
  - Production-optimized dependencies

### 4. **.dockerignore** - Docker Build Optimization
- **Purpose**: Excludes unnecessary files from Docker build
- **Excludes**: `node_modules`, logs, git, IDE files, env files, etc.
- **Result**: Smaller, faster Docker images

### 5. **docker-compose.yml** - Multi-container Orchestration
- **Purpose**: Easy local and production deployment
- **Features**:
  - Automatic service startup
  - Environment variable management
  - Volume mapping for database persistence
  - Auto-restart policy
  - Health checks
  - Network isolation

### 6. **.env.example** - Configuration Template
- **Purpose**: Documents required environment variables
- **Contains**: Template for `GEMINI_API_KEY`, `PORT`, `API_TOKEN`

### 7. **Updated package.json** - NPM Scripts
Added convenience scripts:
```json
"start": "node main.js"              // Start server
"dev": "node main.js"                // Development mode
"install-setup": "./install.sh"      // Run installation
"docker:build": "docker build..."    // Build Docker image
"docker:run": "docker run..."        // Run Docker container
"docker:compose:up": "compose up"    // Start with docker-compose
"docker:compose:down": "compose down"// Stop docker-compose
```

---

## Installation & Deployment Options

### Option 1: Local Development (Recommended for Development)

```bash
# Make scripts executable
chmod +x install.sh start.sh

# Run interactive installation
./install.sh

# Start the server
./start.sh
# or
npm start
```

**What happens**:
1. Checks Node.js installation
2. Installs npm packages
3. Prompts for Gemini API key, port, and API token
4. Creates `.env` and `/public/config.json`
5. Starts the server

---

### Option 2: Docker (Single Container)

```bash
# Build Docker image
docker build -t activ-globe:latest .

# Run container
docker run -p 80:80 --env-file .env activ-globe:latest
```

**Benefits**:
- No local Node.js installation needed
- Isolated environment
- Consistent across machines
- Production-ready

---

### Option 3: Docker Compose (Recommended for Production)

```bash
# Ensure .env file exists with configuration
# Then start with one command:
docker-compose up -d

# View logs:
docker-compose logs -f

# Stop:
docker-compose down
```

**Benefits**:
- Simplest deployment
- Automatic restart on failure
- Volume persistence for database
- Network isolation
- Easy scaling

Using npm scripts:
```bash
npm run docker:compose:up
npm run docker:compose:down
```

---

### Option 4: Using NPM Scripts (All-in-One)

```bash
# Initial setup
npm run install-setup

# Start development
npm run dev

# Start with Docker
npm run docker:build
npm run docker:run

# Or full docker-compose
npm run docker:compose:up
```

---

## Configuration Files

### .env (Environment Variables)
```env
GEMINI_API_KEY="your_key_here"
PORT=80
API_TOKEN="your_token_here"
```

### /public/config.json (Client Configuration)
```json
{
  "API_TOKEN": "your_token_here"
}
```

---

## Docker Image Details

### Base Image
- **Node.js 20 Alpine Linux**: Lightweight (~150MB) and secure

### Security Features
- **Non-root user**: Runs as `nodejs` user (UID 1001)
- **Minimal privileges**: Only necessary packages included
- **Health checks**: Automatic container restart on failure

### Production Optimizations
- **Multi-stage build**: Reduced final image size
- **Production dependencies only**: No dev dependencies in container
- **Graceful shutdown**: Proper signal handling

---

## Deployment Checklist

Before deploying to production:

- [ ] Set strong `API_TOKEN`
- [ ] Use valid `GEMINI_API_KEY`
- [ ] Configure `PORT` appropriately
- [ ] Test locally first
- [ ] Review `.env` variables
- [ ] Ensure database directory permissions
- [ ] Set up reverse proxy (Nginx/HAProxy) for HTTPS
- [ ] Configure firewall rules
- [ ] Set up monitoring/logging

---

## Troubleshooting

### Scripts not executable
```bash
chmod +x install.sh start.sh
```

### Docker build fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker build -t activ-globe:latest .
```

### Port already in use
```bash
# Change PORT in .env
PORT=3000  # instead of 80

# Or specify different port with Docker
docker run -p 3000:80 activ-globe:latest
```

### Permission denied errors
```bash
# In docker-compose.yml, the app runs as non-root
# Ensure proper file permissions:
chmod 755 public/config.json
```

---

## Summary

| Method | Use Case | Complexity | Speed |
|--------|----------|-----------|-------|
| Local Dev | Development | Low | Fast |
| Docker | Testing | Medium | Medium |
| Docker Compose | Production | Medium | Medium |
| NPM Scripts | Quick Start | Low | Fast |

**Recommended flow**:
1. Local development: `./install.sh` → `./start.sh`
2. Testing: `npm run docker:build` → `npm run docker:run`
3. Production: `npm run docker:compose:up` with `.env` pre-configured

