# Test webhook script for PowerShell
$body = '{"event": "test", "data": {"message": "Hello webhook!", "timestamp": "2023-10-06T10:30:00Z"}}'

Write-Host "Testing webhook with PowerShell..." -ForegroundColor Green
Write-Host "Sending POST request to http://localhost:3000/api/webhook" -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/webhook" -Method POST -Body $body -ContentType "application/json"
    Write-Host "Response Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response Body: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}