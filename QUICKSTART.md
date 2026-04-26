# Quick Start Guide

## Fastest Way to Get Started

### For Local Development:
```bash
chmod +x install.sh start.sh
./install.sh    # Interactive setup
./start.sh      # Start server
```

### For Docker Deployment:
```bash
docker-compose up -d    # One command, fully deployed
```

---

## What Each File Does

| File | Purpose |
|------|---------|
| `install.sh` | Interactive installation & configuration |
| `start.sh` | Safe server startup with validation |
| `Dockerfile` | Container definition for production |
| `docker-compose.yml` | Easy local/production deployment |
| `.env.example` | Template for environment variables |
| `package.json` | NPM scripts for all operations |

---

## Common Tasks

**Install and run locally**
```bash
chmod +x install.sh start.sh
./install.sh && ./start.sh
```

**Deploy with Docker**
```bash
docker-compose up -d
```

**View Docker logs**
```bash
docker-compose logs -f
```

**Stop Docker deployment**
```bash
docker-compose down
```

**Build Docker image manually**
```bash
docker build -t activ-globe:latest .
docker run -p 80:80 --env-file .env activ-globe:latest
```

---

## Configuration

Before running, ensure these are configured:

**Required in `.env`:**
- `GEMINI_API_KEY` - Get from https://makersuite.google.com/app/apikey
- `API_TOKEN` - Your authentication token
- `PORT` - Server port (default: 80)

**Required in `/public/config.json`:**
- `API_TOKEN` - Should match `.env` value

The `install.sh` script will prompt you for these.

---

## Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed information about:
- All deployment options
- File explanations
- Production checklist
- Troubleshooting guide
- Security considerations

