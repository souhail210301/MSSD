# MSSD API Comprehensive Test Script
# Tests all API endpoints for the MSSD application

$baseUrl = "http://localhost:8080/api"
$results = @()
$passCount = 0
$failCount = 0

# Color output helper
function Write-TestResult($endpoint, $method, $status, $message, $success) {
    $result = @{
        Endpoint = $endpoint
        Method = $method
        Status = $status
        Message = $message
        Success = $success
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
    $results += $result
    
    if ($success) {
        Write-Host "[PASS] " -ForegroundColor Green -NoNewline
        $script:passCount++
    } else {
        Write-Host "[FAIL] " -ForegroundColor Red -NoNewline
        $script:failCount++
    }
    Write-Host "$method $endpoint - $message"
}

function Test-Endpoint($method, $endpoint, $body = $null, $expectedStatus = 200) {
    try {
        $params = @{
            Uri = "$baseUrl$endpoint"
            Method = $method
            ContentType = "application/json"
            UseBasicParsing = $true
            ErrorAction = "Stop"
        }
        
        if ($body) {
            $params.Body = $body | ConvertTo-Json -Depth 10
        }
        
        $response = Invoke-WebRequest @params
        
        if ($response.StatusCode -eq $expectedStatus) {
            $content = $response.Content | ConvertFrom-Json
            Write-TestResult $endpoint $method $response.StatusCode "Success" $true
            return $content
        } else {
            Write-TestResult $endpoint $method $response.StatusCode "Unexpected status code" $false
            return $null
        }
    } catch {
        Write-TestResult $endpoint $method "ERROR" $_.Exception.Message $false
        return $null
    }
}

Write-Host "`n===========================================================" -ForegroundColor Cyan
Write-Host "MSSD API COMPREHENSIVE TEST SUITE" -ForegroundColor Cyan
Write-Host "===========================================================`n" -ForegroundColor Cyan

# 1. HEALTH CHECK
Write-Host "`n[1] Testing Health Check..." -ForegroundColor Yellow
Test-Endpoint "GET" "/health"

# 2. AUTHENTICATION
Write-Host "`n[2] Testing Authentication..." -ForegroundColor Yellow
Test-Endpoint "POST" "/auth/register" @{
    username = "testuser$(Get-Random)"
    email = "test$(Get-Random)@example.com"
    password = "Test123456!"
    role = "USER"
} 201

Test-Endpoint "POST" "/auth/login" @{
    email = "admin@mssd.com"
    password = "admin123"
}

# 3. THEMES
Write-Host "`n[3] Testing Themes..." -ForegroundColor Yellow
$themes = Test-Endpoint "GET" "/themes"
Test-Endpoint "GET" "/themes/with-formations"
Test-Endpoint "GET" "/themes/admin"

if ($themes -and $themes.Count -gt 0) {
    $themeId = $themes[0].id
    Test-Endpoint "GET" "/themes/$themeId"
    if ($themes[0].slug) {
        Test-Endpoint "GET" "/themes/$($themes[0].slug)/formations"
    }
}

# 4. FORMATIONS
Write-Host "`n[4] Testing Formations..." -ForegroundColor Yellow
$formations = Test-Endpoint "GET" "/formations"
Test-Endpoint "GET" "/formations/published"

if ($formations -and $formations.Count -gt 0) {
    $formationId = $formations[0].id
    Test-Endpoint "GET" "/formations/$formationId"
    
    if ($formations[0].slug) {
        Test-Endpoint "GET" "/formations/slug/$($formations[0].slug)"
    }
    
    if ($formations[0].category) {
        Test-Endpoint "GET" "/formations/category/$($formations[0].category)"
    }
    
    if ($formations[0].level) {
        Test-Endpoint "GET" "/formations/level/$($formations[0].level)"
    }
}

# 5. PORTFOLIO
Write-Host "`n[5] Testing Portfolio..." -ForegroundColor Yellow
$portfolios = Test-Endpoint "GET" "/portfolio"
Test-Endpoint "GET" "/portfolio/admin"
Test-Endpoint "GET" "/portfolio/formations"

if ($portfolios -and $portfolios.Count -gt 0) {
    $portfolioId = $portfolios[0].id
    Test-Endpoint "GET" "/portfolio/$portfolioId"
    
    if ($portfolios[0].category) {
        Test-Endpoint "GET" "/portfolio/category/$($portfolios[0].category)"
    }
}

# 6. BLOG
Write-Host "`n[6] Testing Blog..." -ForegroundColor Yellow
$blogs = Test-Endpoint "GET" "/blogs"
Test-Endpoint "GET" "/blogs/admin"

if ($blogs -and $blogs.Count -gt 0) {
    $blogId = $blogs[0].id
    Test-Endpoint "GET" "/blogs/$blogId"
}

# 7. CATEGORIES
Write-Host "`n[7] Testing Categories..." -ForegroundColor Yellow
$categories = Test-Endpoint "GET" "/categories"

if ($categories -and $categories.Count -gt 0) {
    $categoryId = $categories[0].id
    Test-Endpoint "GET" "/categories/$categoryId"
    
    if ($categories[0].slug) {
        Test-Endpoint "GET" "/categories/slug/$($categories[0].slug)"
    }
}

# 8. REVIEWS
Write-Host "`n[8] Testing Reviews..." -ForegroundColor Yellow
Test-Endpoint "GET" "/reviews/all"

if ($formations -and $formations.Count -gt 0) {
    $formationId = $formations[0].id
    Test-Endpoint "GET" "/reviews?formationId=$formationId"
}

# 9. CALENDAR
Write-Host "`n[9] Testing Calendar..." -ForegroundColor Yellow
$calendars = Test-Endpoint "GET" "/calendars"
Test-Endpoint "GET" "/calendars/available"
Test-Endpoint "GET" "/calendars/range?start=2026-07-01&end=2026-07-31"

if ($calendars -and $calendars.Count -gt 0) {
    $calendarId = $calendars[0].id
    Test-Endpoint "GET" "/calendars/$calendarId"
}

# 10. CALENDAR RESERVATIONS
Write-Host "`n[10] Testing Calendar Reservations..." -ForegroundColor Yellow
$reservations = Test-Endpoint "GET" "/calendar-reservations"

if ($reservations -and $reservations.Count -gt 0) {
    $reservationId = $reservations[0].id
    Test-Endpoint "GET" "/calendar-reservations/$reservationId"
}

# 11. HIGHLIGHTS
Write-Host "`n[11] Testing Highlights..." -ForegroundColor Yellow
Test-Endpoint "GET" "/highlights"

# 12. CONTACT
Write-Host "`n[12] Testing Contact..." -ForegroundColor Yellow
Test-Endpoint "POST" "/contact" @{
    name = "Test User"
    email = "test@example.com"
    subject = "Test Message"
    message = "This is a test message from automated testing"
}

Test-Endpoint "GET" "/contact"

# 13. NEWSLETTER
Write-Host "`n[13] Testing Newsletter..." -ForegroundColor Yellow
Test-Endpoint "POST" "/newsletter" @{
    email = "newsletter$(Get-Random)@example.com"
}

# 14. COMPANY INFO
Write-Host "`n[14] Testing Company Info..." -ForegroundColor Yellow
Test-Endpoint "GET" "/company"

# 15. ANNEX REQUESTS
Write-Host "`n[15] Testing Annex Requests..." -ForegroundColor Yellow
$annexRequests = Test-Endpoint "GET" "/annex-requests"

Test-Endpoint "POST" "/annex-requests" @{
    fullName = "Test User"
    email = "annex$(Get-Random)@example.com"
    phone = "+1234567890"
    company = "Test Company"
    message = "Test annex request"
}

if ($annexRequests -and $annexRequests.Count -gt 0) {
    $annexId = $annexRequests[0].id
    Test-Endpoint "GET" "/annex-requests/$annexId"
}

# 16. FILE MANAGEMENT
Write-Host "`n[16] Testing File Management..." -ForegroundColor Yellow
Test-Endpoint "GET" "/files/images"

# 17. DEBUG ENDPOINTS
Write-Host "`n[17] Testing Debug Endpoints..." -ForegroundColor Yellow
Test-Endpoint "GET" "/debug/themes"

# SUMMARY
Write-Host "`n===========================================================" -ForegroundColor Cyan
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "===========================================================`n" -ForegroundColor Cyan
Write-Host "Total Tests: $($passCount + $failCount)" -ForegroundColor White
Write-Host "Passed: $passCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host "Success Rate: $([math]::Round(($passCount / ($passCount + $failCount)) * 100, 2))%`n" -ForegroundColor White

# Export results to JSON
$results | ConvertTo-Json -Depth 10 | Out-File "test-results-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
Write-Host "Detailed results exported to test-results-$(Get-Date -Format 'yyyyMMdd-HHmmss').json" -ForegroundColor Cyan
