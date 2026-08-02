-- Portfolio Display Fix Script
-- Run this to diagnose and fix portfolio items not showing on frontend

-- ===================================
-- 1. Check current portfolio items
-- ===================================
SELECT 
    id,
    company_name,
    training_title,
    training_date,
    logo_url,
    active,
    created_at
FROM portfolio_items
ORDER BY training_date DESC;

-- ===================================
-- 2. Activate all portfolio items
-- ===================================
UPDATE portfolio_items 
SET active = 1 
WHERE active = 0 OR active IS NULL;

-- ===================================
-- 3. Fix logo URLs (remove path prefixes)
-- ===================================
-- Remove /api/files/ prefix if present
UPDATE portfolio_items 
SET logo_url = REPLACE(logo_url, '/api/files/', '')
WHERE logo_url LIKE '/api/files/%';

-- Remove full URL prefix if present
UPDATE portfolio_items 
SET logo_url = SUBSTRING_INDEX(logo_url, '/', -1)
WHERE logo_url LIKE 'http://%' OR logo_url LIKE 'https://%';

-- ===================================
-- 4. Verify fixes
-- ===================================
SELECT 
    id,
    company_name,
    training_title,
    logo_url,
    active,
    CASE 
        WHEN active = 1 THEN '✓ Active'
        ELSE '✗ Inactive'
    END AS status,
    CASE 
        WHEN logo_url IS NULL THEN '⚠ No logo'
        WHEN logo_url LIKE '/api/files/%' THEN '✗ Bad URL (has path)'
        WHEN logo_url LIKE 'http%' THEN '✗ Bad URL (full URL)'
        WHEN logo_url REGEXP '^[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|gif|svg|webp)$' THEN '✓ Good'
        ELSE '⚠ Check manually'
    END AS logo_status
FROM portfolio_items
ORDER BY training_date DESC;

-- ===================================
-- 5. Count statistics
-- ===================================
SELECT 
    COUNT(*) as total_items,
    SUM(CASE WHEN active = 1 THEN 1 ELSE 0 END) as active_items,
    SUM(CASE WHEN active = 0 THEN 1 ELSE 0 END) as inactive_items,
    SUM(CASE WHEN logo_url IS NOT NULL AND logo_url != '' THEN 1 ELSE 0 END) as items_with_logo,
    SUM(CASE WHEN logo_url IS NULL OR logo_url = '' THEN 1 ELSE 0 END) as items_without_logo
FROM portfolio_items;
