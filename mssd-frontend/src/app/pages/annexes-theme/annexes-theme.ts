import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../model/annexes.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-annexes-theme-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './annexes-theme.html',
  styleUrls: ['./annexes-theme.scss']
})
export class AnnexesThemeDetail implements OnInit {
  theme?: Theme;
  loading = true;
  error = '';
  slug = '';

  // For formation details modal
  selectedFormation: any = null;
  showFormationModal = false;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private router: Router,
    public translationService: TranslationService
  ) {}

  // Translation helper method
  t(key: string): string {
    return this.translationService.t(key);
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    if (!this.slug) {
      this.error = 'Thème introuvable.';
      this.loading = false;
      return;
    }
    this.loadTheme();
  }

  loadTheme(): void {
    this.loading = true;
    this.themeService.getThemeWithFormations(this.slug).subscribe({
      next: (theme: Theme) => {
        this.theme = theme;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'Erreur lors du chargement du thème';
        this.loading = false;
      }
    });
  }

  goRequest(): void {
    this.router.navigate(['/annexes/request'], { queryParams: { theme: this.slug }});
  }

  levelBadge(level: string): string {
    switch (level) {
      case 'BEGINNER': return 'badge bg-success';
      case 'INTERMEDIATE': return 'badge bg-warning';
      case 'EXPERT': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  levelLabel(level: string): string {
    switch (level) {
      case 'BEGINNER': return 'Débutant';
      case 'INTERMEDIATE': return 'Intermédiaire';
      case 'EXPERT': return 'Expert';
      default: return level;
    }
  }

  getLevelBadgeStyle(level: string): string {
    switch (level) {
      case 'BEGINNER': 
        return 'background-color: #d2e4ff; color: #004f89;';
      case 'INTERMEDIATE': 
        return 'background-color: #ffdad5; color: #930007;';
      case 'EXPERT': 
        return 'background-color: #e30613; color: #ffffff;';
      default: 
        return 'background-color: #f3f3f6; color: #414751;';
    }
  }

  viewFormationDetails(formation: any): void {
    this.selectedFormation = formation;
    this.showFormationModal = true;
  }

  closeFormationModal(): void {
    this.showFormationModal = false;
    this.selectedFormation = null;
  }

  requestFormation(formation: any): void {
    this.closeFormationModal();
    this.router.navigate(['/annexes/request'], { 
      queryParams: { 
        theme: this.slug, 
        formation: formation.slug 
      }
    });
  }

  getImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) {
      return 'assets/img/formation-default.jpg';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    // Strip uploads/ prefix if present
    const path = imageUrl.startsWith('uploads/') ? imageUrl.substring(8) : imageUrl;
    return `/api/files/${path}`;
  }
}
