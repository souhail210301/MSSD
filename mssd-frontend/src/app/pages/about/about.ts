import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  // Use an existing local asset as a safe default. If you later add
  // `src/assets/img/about/about-us.jpg`, you can switch `aboutImage` back.
  aboutImage = '/assets/img/logo-placeholder.png';
  private readonly fallbackImage = '/assets/img/logo-placeholder.png';

  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  onImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    if (img && img.src.indexOf(this.fallbackImage) === -1) {
      img.src = this.fallbackImage;
    }
  }
}
