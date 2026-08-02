import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormationService, Formation } from '../../services/formation.service';
import { AnnexRequestService } from '../../services/annex-request.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './formations.html',
  styleUrl: './formations.scss'
})
export class Formations implements OnInit {
  formations: Formation[] = [];
  loading = true;
  error = '';
  selectedFormation: Formation | null = null;
  showModal = false;
  showBookingModal = false;

  // Booking form data
  bookingForm = {
    companyName: '',
    email: '',
    phone: '',
    numParticipants: 1,
    modality: 'IN_PERSON' as 'IN_PERSON' | 'REMOTE' | 'HYBRID',
    preferredDate: '',
    notes: ''
  };
  isSubmitting = false;
  bookingError = '';
  bookingSuccess = false;

  constructor(
    private formationService: FormationService,
    private annexRequestService: AnnexRequestService,
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loadFormations();
  }

  loadFormations() {
    this.loading = true;
    this.formationService.getAllFormations().subscribe({
      next: (data) => {
        // Filter only published formations
        this.formations = data.filter(f => f.published);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading formations:', err);
        this.error = 'Erreur lors du chargement des formations.';
        this.loading = false;
      }
    });
  }

  requestFormation(formationId: number) {
    const formation = this.formations.find(f => f.id === formationId);
    if (formation) {
      this.selectedFormation = formation;
      this.showBookingModal = true;
      // Set default date to today
      this.bookingForm.preferredDate = new Date().toISOString().split('T')[0];
      document.body.style.overflow = 'hidden';
    }
  }

  viewDetails(formationId: number) {
    const formation = this.formations.find(f => f.id === formationId);
    if (formation) {
      this.selectedFormation = formation;
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedFormation = null;
    document.body.style.overflow = '';
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.selectedFormation = null;
    this.bookingError = '';
    this.bookingSuccess = false;
    this.resetBookingForm();
    document.body.style.overflow = '';
  }

  resetBookingForm() {
    this.bookingForm = {
      companyName: '',
      email: '',
      phone: '',
      numParticipants: 1,
      modality: 'IN_PERSON',
      preferredDate: '',
      notes: ''
    };
  }

  submitBooking() {
    if (!this.selectedFormation) return;

    if (!this.bookingForm.companyName || !this.bookingForm.email || !this.bookingForm.preferredDate) {
      this.bookingError = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.isSubmitting = true;
    this.bookingError = '';

    const requestData = {
      companyName: this.bookingForm.companyName,
      email: this.bookingForm.email,
      phone: this.bookingForm.phone || '',
      formationId: this.selectedFormation.id,
      isCustom: false,
      numParticipants: this.bookingForm.numParticipants,
      modality: this.bookingForm.modality,
      preferredDate: this.bookingForm.preferredDate,
      notes: this.bookingForm.notes || `Demande de formation: ${this.selectedFormation.title}`
    };

    this.annexRequestService.createRequest(requestData).subscribe({
      next: (response) => {
        this.bookingSuccess = true;
        this.isSubmitting = false;
        setTimeout(() => {
          this.closeBookingModal();
        }, 2000);
      },
      error: (err) => {
        console.error('Error submitting booking:', err);
        this.bookingError = err.error?.message || 'Erreur lors de la réservation. Veuillez réessayer.';
        this.isSubmitting = false;
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
    const path = imageUrl.startsWith('uploads/') ? imageUrl.substring(8) : imageUrl;
    return `/api/files/${path}`;
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
