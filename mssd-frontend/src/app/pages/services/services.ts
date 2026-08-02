import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
