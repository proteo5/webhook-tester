# Webhook Tester 🚀

A lightweight webhook testing server that captures and logs HTTP requests for debugging and development. Perfect for testing webhooks, APIs, and HTTP integrations.

## 🐳 Quick Start

```bash
# Run with Docker (recommended)
docker run -p 80:3000 proteo5/webhook-tester

# Test your webhook
curl -X POST http://localhost/webhook -H "Content-Type: application/json" -d '{"test": "data"}'
```

**Docker Hub**: https://hub.docker.com/r/proteo5/webhook-tester

## ✨ Features

- **Universal HTTP Support**: All methods (GET, POST, PUT, DELETE, etc.) on any path
- **JSON Body Formatting**: Automatically formats JSON payloads for POST/PUT requests
- **Colorized Console Output**: Easy-to-read request logging with timestamps and headers
- **Health Check Endpoint**: Built-in `/health` endpoint for monitoring
- **CORS Enabled**: Ready for cross-origin requests
- **Docker Ready**: Optimized container with non-root user and health checks

## 🛠️ Installation & Usage

### Docker (Recommended)

```bash
# Basic usage
docker run -p 80:3000 proteo5/webhook-tester

# Custom port
docker run -p 8080:3000 proteo5/webhook-tester

# Background mode
docker run -d -p 80:3000 proteo5/webhook-tester
```

### Local Development

```bash
git clone https://github.com/proteo5/webhook-tester.git
cd webhook-tester
npm install
npm start
```

### Docker Compose

```bash
git clone https://github.com/proteo5/webhook-tester.git
cd webhook-tester
docker-compose up
```

## 🧪 Testing Examples

The server accepts requests on any path with any HTTP method. It will log all request details to the console.

### Basic Examples

```bash
# GET request
curl http://localhost/webhook

# POST with JSON (shows formatted body in console)
curl -X POST http://localhost/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"event": "user.created", "user_id": 12345}'

# PUT with query parameters
curl -X PUT "http://localhost/webhook?action=update&version=1.0" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'

# Health check
curl http://localhost/health
```

### PowerShell Examples

```powershell
# GET request
Invoke-WebRequest -Uri "http://localhost/webhook" -Method GET

# POST with JSON
$body = '{"event": "user.created", "user_id": 12345}'
Invoke-WebRequest -Uri "http://localhost/api/webhook" -Method POST -Body $body -ContentType "application/json"
```

**Note**: Replace `localhost` with `localhost:3000` for local development.

## 📊 Console Output

The server logs detailed information for each request:

```
================== WEBHOOK REQUEST ==================
Timestamp: 2023-10-06T10:30:45.123Z
Method: POST
URL: /api/webhook?source=github&event=push
Query String: {"source": "github", "event": "push"}
JSON Body:
{
  "repository": {"name": "webhook-tester"},
  "commits": [{"id": "abc123", "message": "Initial commit"}]
}
Headers: {"content-type": "application/json", "x-github-event": "push"}
======================================================
```

## 🔧 Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

### Response Format

All requests return a JSON confirmation:

```json
{
  "success": true,
  "message": "Webhook received successfully",
  "timestamp": "2023-10-06T10:30:45.123Z",
  "method": "POST",
  "url": "/api/webhook"
}
```

## 🔍 Use Cases

- **Webhook Development**: Test webhook integrations during development
- **API Debugging**: Debug API calls and inspect request data
- **Third-party Integrations**: Test webhooks from GitHub, Stripe, PayPal, etc.
- **Load Testing**: Simple endpoint for load testing tools
- **Development Workflow**: Quick setup for local webhook testing

## 🚢 Production Deployment

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webhook-tester
spec:
  replicas: 2
  selector:
    matchLabels:
      app: webhook-tester
  template:
    metadata:
      labels:
        app: webhook-tester
    spec:
      containers:
      - name: webhook-tester
        image: proteo5/webhook-tester:latest
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
```

## 🛡️ Security Note

**For development and testing only**. Do not use in production as it logs all request data, including potentially sensitive information.

## � License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`) 
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � Support

- **Issues**: [GitHub Issues](https://github.com/proteo5/webhook-tester/issues)
- **Source**: [GitHub Repository](https://github.com/proteo5/webhook-tester)
- **Docker**: [Docker Hub](https://hub.docker.com/r/proteo5/webhook-tester)

---

Made with ❤️ for the developer community