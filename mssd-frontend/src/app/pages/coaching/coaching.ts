import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coaching.html',
  styleUrls: ['./coaching.scss']
})
export class CoachingComponent implements OnInit {

  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnInit(): void {
    // Scroll to top on init
    window.scrollTo(0, 0);
  }

  // Navigate to contact with coaching context
  requestCoaching(type: string): void {
    // Could store the coaching type and navigate to contact
    console.log('Requesting coaching type:', type);
  }
}
