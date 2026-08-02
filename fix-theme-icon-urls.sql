-- Fix theme icon URLs that have the /api/files/ prefix
-- This removes the /api/files/ prefix from icon_url field in themes table

UPDATE themes 
SET icon_url = REPLACE(icon_url, '/api/files/', '')
WHERE icon_url LIKE '/api/files/%';

-- Show the updated themes
SELECT id, name, icon_url FROM themes WHERE icon_url IS NOT NULL;
