import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './shared/toast/toast.component';
import { filter } from 'rxjs/operators';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app-modern.component.scss']
})
export class AppComponent implements OnInit {
  showScrollTop = false;
  isAdminRoute = false;
  currentYear = new Date().getFullYear();
  currentLanguage: string = 'fr';

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {
    // Subscribe to language changes
    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.translationService.switchLanguage(newLang);
  }

  ngOnInit(): void {
    this.checkScrollPosition();
    // Detect admin routes to hide footer
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAdminRoute = event.urlAfterRedirects?.startsWith('/admin') || false;
    });
    // Check initial route
    this.isAdminRoute = this.router.url.startsWith('/admin');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    this.showScrollTop = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
