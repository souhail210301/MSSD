import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { Theme } from '../../model/annexes.model';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-annexes',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './annexes.html',
  styleUrls: ['./annexes.scss']
})
export class Annexes implements OnInit {
  themes: Theme[] = [];
  paginatedThemes: Theme[] = [];
  loading = true;
  error = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 8; // 4x2 grid for better layout
  totalItems = 0;

  // Stats
  totalFormations = 0;
  totalLearners = 0;
  averageRating = 4.8;

  // Filter
  selectedCategory = 'all';

  constructor(
    private themeService: ThemeService,
    public translationService: TranslationService
  ) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnInit(): void {
    this.loadThemesWithFormations();
  }

  loadThemesWithFormations(): void {
    this.loading = true;
    console.log('🔍 Loading admin themes with formations...');
    this.themeService.getAdminThemesWithFormations().subscribe({
      next: (themes) => {
        console.log('✅ Themes loaded:', themes);
        console.log('📊 Number of themes:', themes.length);
        this.themes = themes;
        this.totalItems = themes.length;
        
        // Calculate stats
        this.calculateStats();
        
        this.updatePaginatedThemes();
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading themes:', err);
        console.error('Response status:', err.status);
        console.error('Response message:', err.message);
        this.error = 'Erreur lors du chargement des formations.';
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    // Count total formations
    this.totalFormations = this.themes.reduce((sum, theme) => {
      return sum + (theme.formations?.length || 0);
    }, 0);
    
    // You can add more stats calculations here
    // For now, we'll use a placeholder for learners
    this.totalLearners = 5000;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedThemes();
  }

  getLevelLabel(level: string): string {
    switch (level) {
      case 'BEGINNER': return 'Débutant';
      case 'INTERMEDIATE': return 'Intermédiaire';
      case 'EXPERT': return 'Expert';
      default: return level;
    }
  }

  getLevelClass(level: string): string {
    switch (level) {
      case 'BEGINNER': return 'badge bg-success';
      case 'INTERMEDIATE': return 'badge bg-warning';
      case 'EXPERT': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  getActiveFormationsCount(theme: Theme): number {
    // Since we only receive active/published formations from the API,
    // all formations in the theme are considered active
    return theme.formations?.length || 0;
  }

  getFormationLevels(theme: Theme): number {
    if (!theme.formations) return 0;
    const levels = new Set(theme.formations.map(f => f.level));
    return levels.size;
  }

  updatePaginatedThemes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedThemes = this.themes.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedThemes();
    // Scroll to top of annexes section
    const annexesSection = document.querySelector('section');
    if (annexesSection) {
      annexesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getIconUrl(iconUrl: string | undefined): string {
    if (!iconUrl) return '';
    // If it's already a full URL (http/https), return as-is
    if (iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) {
      return iconUrl;
    }
    // If it already starts with /api/files/, return as-is
    if (iconUrl.startsWith('/api/files/')) {
      return iconUrl;
    }
    // Otherwise, prepend the path
    return `/api/files/${iconUrl}`;
  }
}