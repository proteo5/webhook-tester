const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Function to format and display request information
function logRequest(req) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const queryString = Object.keys(req.query).length > 0 ? 
    JSON.stringify(req.query, null, 2) : 'No query parameters';
  
  console.log(`\n${colors.bright}${colors.cyan}================== WEBHOOK REQUEST ==================${colors.reset}`);
  console.log(`${colors.yellow}Timestamp:${colors.reset} ${timestamp}`);
  console.log(`${colors.green}Method:${colors.reset} ${colors.bright}${method}${colors.reset}`);
  console.log(`${colors.blue}URL:${colors.reset} ${url}`);
  console.log(`${colors.magenta}Query String:${colors.reset}`);
  console.log(queryString);
  
  // Only log body for POST and PUT requests with JSON content
  if ((method === 'POST' || method === 'PUT') && req.body) {
    const contentType = req.get('Content-Type') || '';
    
    if (contentType.includes('application/json') && Object.keys(req.body).length > 0) {
      console.log(`${colors.yellow}JSON Body:${colors.reset}`);
      console.log(JSON.stringify(req.body, null, 2));
    } else if (Object.keys(req.body).length > 0) {
      console.log(`${colors.yellow}Body (${contentType}):${colors.reset}`);
      console.log(req.body);
    } else {
      console.log(`${colors.dim}No body content${colors.reset}`);
    }
  }
  
  // Log headers if they exist
  if (req.headers && Object.keys(req.headers).length > 0) {
    console.log(`${colors.white}Headers:${colors.reset}`);
    const importantHeaders = {};
    Object.keys(req.headers).forEach(key => {
      if (key.toLowerCase().includes('content-') || 
          key.toLowerCase().includes('authorization') || 
          key.toLowerCase().includes('user-agent') ||
          key.toLowerCase().includes('x-')) {
        importantHeaders[key] = req.headers[key];
      }
    });
    if (Object.keys(importantHeaders).length > 0) {
      console.log(JSON.stringify(importantHeaders, null, 2));
    }
  }
  
  console.log(`${colors.bright}${colors.cyan}======================================================${colors.reset}\n`);
}

// Catch-all route for all HTTP methods and paths
app.all('*', (req, res) => {
  // Log the request details
  logRequest(req);
  
  // Send a simple response
  res.status(200).json({
    success: true,
    message: 'Webhook received successfully',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    receivedAt: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`${colors.bright}${colors.green}🚀 Webhook Tester Server is running!${colors.reset}`);
  console.log(`${colors.yellow}📡 Listening on port: ${colors.bright}${PORT}${colors.reset}`);
  console.log(`${colors.blue}🔗 Server URL: ${colors.bright}http://localhost:${PORT}${colors.reset}`);
  console.log(`${colors.magenta}📝 Ready to capture webhooks on any path and method!${colors.reset}`);
  console.log(`${colors.cyan}💡 Try (PowerShell): $body = '{"test": "data"}'; Invoke-WebRequest -Uri "http://localhost:${PORT}/webhook" -Method POST -Body $body -ContentType "application/json"${colors.reset}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`\n${colors.yellow}⚠️  Received SIGTERM, shutting down gracefully...${colors.reset}`);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}⚠️  Received SIGINT, shutting down gracefully...${colors.reset}`);
  process.exit(0);
});