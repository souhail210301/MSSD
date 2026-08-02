# Translation Template - Copy & Paste for Any Page

## 🎯 Use This Template for Each New Page

### Step 1: TypeScript Component Template

Copy this into your component file:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';  // ← ADD THIS LINE

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './your-page.html',
  styleUrl: './your-page.scss'
})
export class YourPage {
  constructor(
    // ... other services you need
    public translationService: TranslationService  // ← ADD THIS LINE
  ) {}

  // ← ADD THIS METHOD
  t(key: string): string {
    return this.translationService.translate(key);
  }

  // ... rest of your component code
}
```

---

### Step 2: Translation Keys Template

Copy this structure into `translation.service.ts`:

```typescript
private translations: { [lang: string]: TranslationData} = {
  fr: {
    // ... existing keys ...

    // ========================================
    // YOUR-PAGE-NAME PAGE
    // ========================================
    
    // Hero/Header Section
    'yourpage.hero.title': 'Votre Titre en Français',
    'yourpage.hero.subtitle': 'Votre sous-titre en français',
    'yourpage.hero.button': 'Votre Bouton',
    
    // Main Content Section
    'yourpage.section1.title': 'Titre de Section',
    'yourpage.section1.description': 'Description en français',
    'yourpage.section1.button': 'Bouton d\'action',
    
    // Cards/Items (if applicable)
    'yourpage.card1.title': 'Titre Carte 1',
    'yourpage.card1.description': 'Description carte 1',
    'yourpage.card2.title': 'Titre Carte 2',
    'yourpage.card2.description': 'Description carte 2',
    
    // Form Labels (if applicable)
    'yourpage.form.field1-label': 'Libellé du Champ',
    'yourpage.form.field1-placeholder': 'Placeholder en français',
    'yourpage.form.submit-button': 'Soumettre',
    
    // Validation Messages (if applicable)
    'yourpage.validation.required': 'Ce champ est requis',
    'yourpage.validation.minlength': 'Minimum {n} caractères',
    'yourpage.validation.invalid': 'Valeur invalide',
    
    // CTA Section
    'yourpage.cta.title': 'Titre Appel à l\'Action',
    'yourpage.cta.description': 'Description CTA',
    'yourpage.cta.button': 'Bouton CTA',
    
    // Status/Labels
    'yourpage.status.active': 'Actif',
    'yourpage.status.inactive': 'Inactif',
    'yourpage.label.date': 'Date',
    'yourpage.label.author': 'Auteur',
    
    // Messages
    'yourpage.message.success': 'Opération réussie',
    'yourpage.message.error': 'Une erreur s\'est produite',
    'yourpage.message.loading': 'Chargement...',
    'yourpage.message.no-data': 'Aucune donnée disponible',
  },
  en: {
    // ... existing keys ...

    // ========================================
    // YOUR-PAGE-NAME PAGE
    // ========================================
    
    // Hero/Header Section
    'yourpage.hero.title': 'Your Title in English',
    'yourpage.hero.subtitle': 'Your subtitle in English',
    'yourpage.hero.button': 'Your Button',
    
    // Main Content Section
    'yourpage.section1.title': 'Section Title',
    'yourpage.section1.description': 'Description in English',
    'yourpage.section1.button': 'Action Button',
    
    // Cards/Items (if applicable)
    'yourpage.card1.title': 'Card 1 Title',
    'yourpage.card1.description': 'Card 1 description',
    'yourpage.card2.title': 'Card 2 Title',
    'yourpage.card2.description': 'Card 2 description',
    
    // Form Labels (if applicable)
    'yourpage.form.field1-label': 'Field Label',
    'yourpage.form.field1-placeholder': 'Placeholder in English',
    'yourpage.form.submit-button': 'Submit',
    
    // Validation Messages (if applicable)
    'yourpage.validation.required': 'This field is required',
    'yourpage.validation.minlength': 'Minimum {n} characters',
    'yourpage.validation.invalid': 'Invalid value',
    
    // CTA Section
    'yourpage.cta.title': 'Call to Action Title',
    'yourpage.cta.description': 'CTA Description',
    'yourpage.cta.button': 'CTA Button',
    
    // Status/Labels
    'yourpage.status.active': 'Active',
    'yourpage.status.inactive': 'Inactive',
    'yourpage.label.date': 'Date',
    'yourpage.label.author': 'Author',
    
    // Messages
    'yourpage.message.success': 'Operation successful',
    'yourpage.message.error': 'An error occurred',
    'yourpage.message.loading': 'Loading...',
    'yourpage.message.no-data': 'No data available',
  }
};
```

---

### Step 3: HTML Template Patterns

#### Pattern 1: Simple Text Elements
```html
<!-- Headings -->
<h1>{{ t('yourpage.hero.title') }}</h1>
<h2>{{ t('yourpage.section.title') }}</h2>
<h3>{{ t('yourpage.subsection.title') }}</h3>

<!-- Paragraphs -->
<p>{{ t('yourpage.section.description') }}</p>

<!-- Spans -->
<span>{{ t('yourpage.label.text') }}</span>

<!-- List items -->
<li>{{ t('yourpage.list.item1') }}</li>
```

#### Pattern 2: Buttons & Links
```html
<!-- Buttons -->
<button>{{ t('yourpage.button.submit') }}</button>
<button>{{ t('yourpage.button.cancel') }}</button>

<!-- Links -->
<a routerLink="/somewhere">{{ t('yourpage.link.learn-more') }}</a>
```

#### Pattern 3: Form Inputs
```html
<!-- Text Input -->
<label>{{ t('yourpage.form.name-label') }}</label>
<input 
  type="text"
  [placeholder]="t('yourpage.form.name-placeholder')"
  [(ngModel)]="model.name"
  name="name">

<!-- Email Input -->
<label>{{ t('yourpage.form.email-label') }}</label>
<input 
  type="email"
  [placeholder]="t('yourpage.form.email-placeholder')"
  [(ngModel)]="model.email"
  name="email">

<!-- Textarea -->
<label>{{ t('yourpage.form.message-label') }}</label>
<textarea
  [placeholder]="t('yourpage.form.message-placeholder')"
  [(ngModel)]="model.message"
  name="message"
  rows="5"></textarea>

<!-- Select Dropdown -->
<label>{{ t('yourpage.form.category-label') }}</label>
<select [(ngModel)]="model.category" name="category">
  <option value="">{{ t('yourpage.form.select-placeholder') }}</option>
  <option value="option1">{{ t('yourpage.form.option1') }}</option>
  <option value="option2">{{ t('yourpage.form.option2') }}</option>
</select>

<!-- Checkbox -->
<input type="checkbox" id="terms" name="terms">
<label for="terms">{{ t('yourpage.form.agree-terms') }}</label>
```

#### Pattern 4: Validation Messages
```html
<div *ngIf="fieldName.invalid && fieldName.touched">
  <span *ngIf="fieldName.errors?.['required']">
    {{ t('yourpage.validation.field-required') }}
  </span>
  <span *ngIf="fieldName.errors?.['email']">
    {{ t('yourpage.validation.email-invalid') }}
  </span>
  <span *ngIf="fieldName.errors?.['minlength']">
    {{ t('yourpage.validation.min-length') }}
  </span>
</div>
```

#### Pattern 5: Conditional Content
```html
<!-- Loading State -->
<div *ngIf="isLoading">
  {{ t('yourpage.message.loading') }}
</div>

<!-- Success Message -->
<div *ngIf="isSuccess" class="success">
  {{ t('yourpage.message.success') }}
</div>

<!-- Error Message -->
<div *ngIf="isError" class="error">
  {{ t('yourpage.message.error') }}
</div>

<!-- No Data -->
<div *ngIf="items.length === 0">
  {{ t('yourpage.message.no-data') }}
</div>
```

#### Pattern 6: Images with Alt Text
```html
<img 
  src="assets/img/photo.jpg" 
  [alt]="t('yourpage.image.alt-text')"
  class="w-full">
```

#### Pattern 7: Tooltips/Titles
```html
<button [title]="t('yourpage.button.tooltip')">
  <i class="bi bi-info-circle"></i>
</button>

<a [title]="t('yourpage.link.tooltip')">
  {{ t('yourpage.link.text') }}
</a>
```

#### Pattern 8: Dynamic Lists/Cards
```html
<!-- Loop with mixed static/dynamic content -->
<div *ngFor="let item of items">
  <h3>{{ item.name }}</h3>  <!-- Dynamic from database -->
  <p>{{ t('yourpage.card.label-date') }}: {{ item.date }}</p>  <!-- Label translated -->
  <button>{{ t('yourpage.card.button-view') }}</button>  <!-- Button translated -->
</div>
```

#### Pattern 9: Multi-part Text
```html
<!-- When you need to break text for styling -->
<h1>
  {{ t('yourpage.hero.title-part1') }}
  <span class="highlight">{{ t('yourpage.hero.title-part2') }}</span>
</h1>
```

#### Pattern 10: Status Badges
```html
<span class="badge" [class.active]="item.isActive">
  {{ item.isActive ? t('yourpage.status.active') : t('yourpage.status.inactive') }}
</span>
```

---

## 🎨 Full Page Example

Here's a complete mini-page showing all patterns together:

### TypeScript (`example-page.ts`)
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './example-page.html',
  styleUrl: './example-page.scss'
})
export class ExamplePage implements OnInit {
  items: any[] = [];
  isLoading = false;
  isSuccess = false;
  
  formModel = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    public translationService: TranslationService
  ) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // Load data...
    setTimeout(() => {
      this.items = [{ name: 'Item 1', date: '2024-01-01' }];
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.isSuccess = true;
      alert(this.t('example.message.success'));
    }
  }
}
```

### HTML (`example-page.html`)
```html
<main>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1>{{ t('example.hero.title') }}</h1>
      <p>{{ t('example.hero.subtitle') }}</p>
      <button class="btn-primary">{{ t('example.hero.button') }}</button>
    </div>
  </section>

  <!-- Content Section -->
  <section class="content">
    <div class="container">
      <h2>{{ t('example.content.title') }}</h2>
      
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading">
        {{ t('example.message.loading') }}
      </div>

      <!-- Items List -->
      <div *ngIf="!isLoading && items.length > 0" class="items-grid">
        <div *ngFor="let item of items" class="item-card">
          <h3>{{ item.name }}</h3>
          <p>{{ t('example.card.label-date') }}: {{ item.date }}</p>
          <button>{{ t('example.card.button-view') }}</button>
        </div>
      </div>

      <!-- No Data -->
      <div *ngIf="!isLoading && items.length === 0" class="no-data">
        {{ t('example.message.no-data') }}
      </div>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section class="contact-form">
    <div class="container">
      <h2>{{ t('example.form.title') }}</h2>
      
      <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
        <!-- Name Field -->
        <div class="form-group">
          <label>{{ t('example.form.name-label') }}</label>
          <input 
            type="text"
            [placeholder]="t('example.form.name-placeholder')"
            [(ngModel)]="formModel.name"
            name="name"
            required
            #name="ngModel">
          <div *ngIf="name.invalid && name.touched">
            <span *ngIf="name.errors?.['required']">
              {{ t('example.validation.name-required') }}
            </span>
          </div>
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label>{{ t('example.form.email-label') }}</label>
          <input 
            type="email"
            [placeholder]="t('example.form.email-placeholder')"
            [(ngModel)]="formModel.email"
            name="email"
            required
            email
            #email="ngModel">
          <div *ngIf="email.invalid && email.touched">
            <span *ngIf="email.errors?.['required']">
              {{ t('example.validation.email-required') }}
            </span>
            <span *ngIf="email.errors?.['email']">
              {{ t('example.validation.email-invalid') }}
            </span>
          </div>
        </div>

        <!-- Message Field -->
        <div class="form-group">
          <label>{{ t('example.form.message-label') }}</label>
          <textarea
            [placeholder]="t('example.form.message-placeholder')"
            [(ngModel)]="formModel.message"
            name="message"
            required
            rows="5"
            #message="ngModel"></textarea>
          <div *ngIf="message.invalid && message.touched">
            <span *ngIf="message.errors?.['required']">
              {{ t('example.validation.message-required') }}
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="btn-primary"
          [disabled]="!contactForm.valid">
          {{ t('example.form.submit-button') }}
        </button>
      </form>

      <!-- Success Message -->
      <div *ngIf="isSuccess" class="success-message">
        {{ t('example.message.success') }}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta">
    <div class="container">
      <h2>{{ t('example.cta.title') }}</h2>
      <p>{{ t('example.cta.description') }}</p>
      <button class="btn-secondary">{{ t('example.cta.button') }}</button>
    </div>
  </section>
</main>
```

---

## ✅ Quick Checklist

Before moving to the next page, verify:

- [ ] TypeScript: `import { TranslationService }`
- [ ] TypeScript: `constructor(public translationService: TranslationService)`
- [ ] TypeScript: `t(key: string): string { return this.translationService.translate(key); }`
- [ ] Translation Service: All FR keys added
- [ ] Translation Service: All EN keys added
- [ ] HTML: All text uses `{{ t('key') }}`
- [ ] HTML: All placeholders use `[placeholder]="t('key')"`
- [ ] HTML: All alt text uses `[alt]="t('key')"`
- [ ] Test: Switch language and verify all text changes
- [ ] Test: No console errors
- [ ] Test: No "key.name" visible on page

---

## 🚀 Ready to Use!

1. Copy the TypeScript template → paste into your .ts file
2. Copy the translation keys template → paste into translation.service.ts
3. Use the HTML patterns → update your .html file
4. Test → repeat for next page

You got this! 💪
