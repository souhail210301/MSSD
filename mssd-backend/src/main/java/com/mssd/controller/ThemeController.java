package com.mssd.controller;

import com.mssd.dto.ThemeDto;
import com.mssd.dto.ThemeCreateUpdateDto;
import com.mssd.service.ThemeService;
import com.mssd.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/themes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ThemeController {
    
    private final ThemeService themeService;
    private final FileStorageService fileStorageService;
    
    /**
     * Get all active themes
     * GET /api/themes
     */
    @GetMapping
    public ResponseEntity<List<ThemeDto>> getAllThemes() {
        List<ThemeDto> themes = themeService.getAllActiveThemes();
        return ResponseEntity.ok(themes);
    }
    
    /**
     * Get all themes with their formations
     * GET /api/themes/with-formations
     */
    @GetMapping("/with-formations")
    public ResponseEntity<List<ThemeDto>> getThemesWithFormations() {
        List<ThemeDto> themes = themeService.getThemesWithFormations();
        return ResponseEntity.ok(themes);
    }

    /**
     * Get theme with formations by slug
     * GET /api/themes/{slug}/formations
     */
    @GetMapping("/{slug}/formations")
    public ResponseEntity<ThemeDto> getThemeWithFormationsBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(themeService.getThemeWithFormationsBySlug(slug));
    }

    /**
     * Get a specific theme by ID
     * GET /api/themes/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ThemeDto> getThemeById(@PathVariable Long id) {
        return ResponseEntity.ok(themeService.getThemeById(id));
    }

    /**
     * Create a new theme
     * POST /api/themes
     */
    @PostMapping
    public ResponseEntity<ThemeDto> createTheme(@RequestBody @jakarta.validation.Valid ThemeCreateUpdateDto dto) {
        return ResponseEntity.ok(themeService.createTheme(dto));
    }

    /**
     * Update existing theme
     * PUT /api/themes/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ThemeDto> updateTheme(@PathVariable Long id, @RequestBody @jakarta.validation.Valid ThemeCreateUpdateDto dto) {
        return ResponseEntity.ok(themeService.updateTheme(id, dto));
    }

    /**
     * Delete a theme (only if no formations)
     * DELETE /api/themes/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTheme(@PathVariable Long id) {
        themeService.deleteTheme(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get all themes including inactive ones (Admin only)
     * GET /api/themes/admin
     */
    @GetMapping("/admin")
    public ResponseEntity<List<ThemeDto>> getAllThemesAdmin() {
        List<ThemeDto> themes = themeService.getAllThemesAdmin();
        return ResponseEntity.ok(themes);
    }
    
    /**
     * Upload theme icon
     * POST /api/themes/upload-icon
     */
    @PostMapping("/upload-icon")
    public ResponseEntity<Map<String, String>> uploadIcon(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file == null || file.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Please select a file to upload");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Check file size (max 2MB)
            if (file.getSize() > 2 * 1024 * 1024) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "File size must not exceed 2MB");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.startsWith("image/"))) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Only image files are allowed");
                return ResponseEntity.badRequest().body(error);
            }
            
            String filename = fileStorageService.storeFile(file);
            Map<String, String> response = new HashMap<>();
            response.put("url", filename);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}