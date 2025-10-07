# Webhook Tester 🚀

A simple, lightweight webhook testing server that captures and logs HTTP requests for debugging and testing purposes. Perfect for testing webhooks, APIs, and HTTP integrations during development.

## ✨ Features

- **Universal Capture**: Accepts all HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)
- **Wildcard Routing**: Captures requests on any URL path
- **Detailed Logging**: Displays method, URL, query parameters, and headers
- **JSON Body Formatting**: Automatically formats and displays JSON payloads for POST/PUT requests
- **Colorized Output**: Easy-to-read console output with color coding
- **CORS Enabled**: Ready for cross-origin requests
- **Lightweight**: Minimal dependencies and fast startup
- **Port Configurable**: Use environment variables or default port

## 📋 Requirements

- Node.js 14.0.0 or higher
- npm or yarn

## 🛠️ Installation

### Clone and Install

```bash
git clone https://github.com/proteo5/webhook-tester.git
cd webhook-tester
npm install
```

### Or Install Globally (Coming Soon)

```bash
npm install -g webhook-tester
```

## 🚀 Usage

### Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Custom port
PORT=8080 npm start
```

The server will start on `http://localhost:3000` by default.

### Testing Webhooks

Once the server is running, you can send requests to any endpoint:

#### Basic GET Request

**Linux/macOS/Git Bash:**
```bash
curl http://localhost:3000/webhook
```

**Windows PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/webhook" -Method GET
```

#### POST with JSON Data

**Linux/macOS/Git Bash:**
```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"event": "user.created", "user_id": 12345, "email": "test@example.com"}'
```

**Windows PowerShell:**
```powershell
$body = '{"event": "user.created", "user_id": 12345, "email": "test@example.com"}'
Invoke-WebRequest -Uri "http://localhost:3000/api/webhook" -Method POST -Body $body -ContentType "application/json"
```

#### PUT with Query Parameters

**Linux/macOS/Git Bash:**
```bash
curl -X PUT "http://localhost:3000/webhook?action=update&version=1.0" \
  -H "Content-Type: application/json" \
  -d '{"status": "active", "timestamp": "2023-10-06T10:30:00Z"}'
```

**Windows PowerShell:**
```powershell
$body = '{"status": "active", "timestamp": "2023-10-06T10:30:00Z"}'
Invoke-WebRequest -Uri "http://localhost:3000/webhook?action=update&version=1.0" -Method PUT -Body $body -ContentType "application/json"
```

#### DELETE Request

**Linux/macOS/Git Bash:**
```bash
curl -X DELETE http://localhost:3000/resource/123?force=true
```

**Windows PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/resource/123?force=true" -Method DELETE
```

## 📊 Console Output Example

```
================== WEBHOOK REQUEST ==================
Timestamp: 2023-10-06T10:30:45.123Z
Method: POST
URL: /api/webhook?source=github&event=push
Query String:
{
  "source": "github",
  "event": "push"
}
JSON Body:
{
  "repository": {
    "name": "webhook-tester",
    "full_name": "proteo5/webhook-tester"
  },
  "commits": [
    {
      "id": "abc123",
      "message": "Initial commit"
    }
  ]
}
Headers:
{
  "content-type": "application/json",
  "user-agent": "GitHub-Hookshot/abc123",
  "x-github-event": "push"
}
======================================================
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

### Response Format

All requests receive a JSON response:

```json
{
  "success": true,
  "message": "Webhook received successfully",
  "timestamp": "2023-10-06T10:30:45.123Z",
  "method": "POST",
  "url": "/api/webhook",
  "receivedAt": "2023-10-06T10:30:45.123Z"
}
```

## 🔍 Use Cases

- **Webhook Development**: Test webhook integrations during development
- **API Debugging**: Debug API calls and inspect request data
- **Third-party Integrations**: Test webhooks from GitHub, Stripe, PayPal, etc.
- **Load Testing**: Simple endpoint for load testing tools
- **Request Inspection**: Analyze HTTP request structure and headers
- **Development Workflow**: Quick setup for local webhook testing

## 🛡️ Security Note

This tool is designed for **development and testing purposes only**. Do not use in production environments as it logs all request data to the console, which may include sensitive information.

## 📚 API Reference

### Endpoints

- **`* /*`** - Accepts all HTTP methods on any path
  - Returns: `200 OK` with JSON response
  - Logs: Complete request details to console

### Request Logging

The server logs the following information for each request:

1. **Timestamp**: ISO 8601 formatted timestamp
2. **HTTP Method**: GET, POST, PUT, DELETE, etc.
3. **URL**: Complete URL path including query parameters
4. **Query String**: Parsed query parameters (if any)
5. **JSON Body**: Formatted JSON body (POST/PUT with JSON content-type only)
6. **Headers**: Important headers (Content-Type, Authorization, User-Agent, X-* headers)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Inspired by the need for simple webhook testing tools
- Thanks to the open source community

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/proteo5/webhook-tester/issues) page
2. Create a new issue if your question isn't already answered
3. Provide as much detail as possible when reporting bugs

---

Made with ❤️ for the developer community