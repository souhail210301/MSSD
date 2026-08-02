# How to Add Translations to Any Page - Complete Guide

## Quick Win: 3-Step Process

For ANY page in your app, follow these 3 simple steps:

### Step 1: Update the TypeScript Component

Add TranslationService to your component:

```typescript
import { TranslationService } from '../../services/translation.service';

export class YourPageComponent {
  constructor(
    // ... your existing services
    public translationService: TranslationService  // ADD THIS
  ) {}

  // ADD THIS METHOD
  t(key: string): string {
    return this.translationService.translate(key);
  }
}
```

###  Step 2: Add Translation Keys to Translation Service

Open `src/app/services/translation.service.ts` and add your keys:

```typescript
fr: {
  // YOUR PAGE - Section Name
  'yourpage.section.title': 'Votre Titre en Français',
  'yourpage.section.button': 'Votre Bouton',
  // ... add all text from your page
},
en: {
  // YOUR PAGE - Section Name
  'yourpage.section.title': 'Your Title in English',
  'yourpage.section.button': 'Your Button',
  // ... add all text from your page
}
```

### Step 3: Update Your HTML Template

Replace hardcoded text with translation calls:

```html
<!-- BEFORE -->
<h1>Welcome to MSSD</h1>
<button>Contact Us</button>
<input placeholder="Enter your name">

<!-- AFTER -->
<h1>{{ t('page.hero.title') }}</h1>
<button>{{ t('page.hero.button') }}</button>
<input [placeholder]="t('page.form.name-placeholder')">
```

**Important Notes:**
- Regular text: Use `{{ t('key') }}`
- HTML attributes (placeholder, title, alt): Use `[attribute]="t('key')"`

---

## Complete Working Example: Contact Page

### File 1: `contact.ts` (TypeScript Component)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { TranslationService } from '../../services/translation.service';  // ← ADD THIS

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactModel = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;

  constructor(
    private contactSvc: ContactService,
    public translationService: TranslationService  // ← ADD THIS
  ) {}

  // ← ADD THIS METHOD
  t(key: string): string {
    return this.translationService.translate(key);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.isSubmitting = true;
      this.contactSvc.submit(this.contactModel).subscribe({
        next: () => {
          alert(this.t('contact.success-message'));
          form.reset();
          this.isSubmitting = false;
        },
        error: () => {
          alert(this.t('contact.error-message'));
          this.isSubmitting = false;
        }
      });
    }
  }
}
```

### File 2: `translation.service.ts` (Add Keys)

```typescript
private translations: { [lang: string]: TranslationData } = {
  fr: {
    // ... existing keys ...
    
    // CONTACT PAGE
    'contact.hero.title': 'Contacter le Leadership Commercial',
    'contact.hero.subtitle': 'Discutez de la façon dont MSSD peut architecturer une solution de croissance pour votre organisation.',
    'contact.info.address': 'Adresse',
    'contact.info.phone': 'Téléphone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Horaires',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.subtitle': 'Remplissez le formulaire ci-dessous',
    'contact.form.name-label': 'Nom complet',
    'contact.form.name-placeholder': 'John Dupont',
    'contact.form.email-label': 'Email',
    'contact.form.email-placeholder': 'j.dupont@company.com',
    'contact.form.phone-label': 'Téléphone',
    'contact.form.phone-placeholder': '+33 6 00 00 00 00',
    'contact.form.subject-label': 'Sujet',
    'contact.form.subject-placeholder': 'Sélectionnez un sujet',
    'contact.form.message-label': 'Message',
    'contact.form.message-placeholder': 'Comment pouvons-nous vous aider ?',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.submitting': 'Envoi en cours...',
    'contact.success-message': 'Message envoyé avec succès !',
    'contact.error-message': 'Erreur lors de l\'envoi. Veuillez réessayer.',
    'contact.validation.name-required': 'Le nom est requis',
    'contact.validation.name-minlength': 'Minimum 2 caractères',
    'contact.validation.email-required': 'L\'email est requis',
    'contact.validation.email-invalid': 'Veuillez entrer un email valide',
    'contact.validation.subject-required': 'Le sujet est requis',
    'contact.validation.message-required': 'Le message est requis',
    'contact.validation.message-minlength': 'Minimum 10 caractères',
  },
  en: {
    // ... existing keys ...
    
    // CONTACT PAGE
    'contact.hero.title': 'Contact Sales Leadership',
    'contact.hero.subtitle': 'Discuss how MSSD can architect a growth solution for your organization.',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Hours',
    'contact.form.title': 'Send us a message',
    'contact.form.subtitle': 'Fill out the form below',
    'contact.form.name-label': 'Full Name',
    'contact.form.name-placeholder': 'John Smith',
    'contact.form.email-label': 'Email',
    'contact.form.email-placeholder': 'j.smith@company.com',
    'contact.form.phone-label': 'Phone',
    'contact.form.phone-placeholder': '+1 555 000 0000',
    'contact.form.subject-label': 'Subject',
    'contact.form.subject-placeholder': 'Select a subject',
    'contact.form.message-label': 'Message',
    'contact.form.message-placeholder': 'How can we help you?',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.success-message': 'Message sent successfully!',
    'contact.error-message': 'Error sending message. Please try again.',
    'contact.validation.name-required': 'Name is required',
    'contact.validation.name-minlength': 'Minimum 2 characters',
    'contact.validation.email-required': 'Email is required',
    'contact.validation.email-invalid': 'Please enter a valid email',
    'contact.validation.subject-required': 'Subject is required',
    'contact.validation.message-required': 'Message is required',
    'contact.validation.message-minlength': 'Minimum 10 characters',
  }
};
```

### File 3: `contact.html` (HTML Template)

```html
<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <h1>{{ t('contact.hero.title') }}</h1>
    <p>{{ t('contact.hero.subtitle') }}</p>
  </div>
</section>

<!-- Contact Form -->
<section class="contact-form">
  <div class="container">
    
    <!-- Form Header -->
    <div class="form-header">
      <h2>{{ t('contact.form.title') }}</h2>
      <p>{{ t('contact.form.subtitle') }}</p>
    </div>

    <!-- Form -->
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
      
      <!-- Name Field -->
      <div>
        <label>{{ t('contact.form.name-label') }} *</label>
        <input 
          type="text"
          [placeholder]="t('contact.form.name-placeholder')"
          [(ngModel)]="contactModel.fullName" 
          name="fullName"
          required 
          minlength="2" 
          #fullName="ngModel">
        <div *ngIf="fullName.invalid && fullName.touched">
          <span *ngIf="fullName.errors?.['required']">{{ t('contact.validation.name-required') }}</span>
          <span *ngIf="fullName.errors?.['minlength']">{{ t('contact.validation.name-minlength') }}</span>
        </div>
      </div>

      <!-- Email Field -->
      <div>
        <label>{{ t('contact.form.email-label') }} *</label>
        <input 
          type="email"
          [placeholder]="t('contact.form.email-placeholder')"
          [(ngModel)]="contactModel.email" 
          name="email"
          required 
          email 
          #emailField="ngModel">
        <div *ngIf="emailField.invalid && emailField.touched">
          <span *ngIf="emailField.errors?.['required']">{{ t('contact.validation.email-required') }}</span>
          <span *ngIf="emailField.errors?.['email']">{{ t('contact.validation.email-invalid') }}</span>
        </div>
      </div>

      <!-- Message Field -->
      <div>
        <label>{{ t('contact.form.message-label') }} *</label>
        <textarea
          [placeholder]="t('contact.form.message-placeholder')"
          [(ngModel)]="contactModel.message" 
          name="message"
          required 
          minlength="10" 
          #messageField="ngModel"
          rows="5"></textarea>
        <div *ngIf="messageField.invalid && messageField.touched">
          <span *ngIf="messageField.errors?.['required']">{{ t('contact.validation.message-required') }}</span>
          <span *ngIf="messageField.errors?.['minlength']">{{ t('contact.validation.message-minlength') }}</span>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        [disabled]="isSubmitting || !contactForm.valid">
        <span *ngIf="!isSubmitting">{{ t('contact.form.submit') }}</span>
        <span *ngIf="isSubmitting">{{ t('contact.form.submitting') }}</span>
      </button>
    </form>

  </div>
</section>
```

---

## Key Translation Patterns

### 1. Simple Text
```html
<!-- Titles, paragraphs, spans, etc. -->
<h1>{{ t('page.section.title') }}</h1>
<p>{{ t('page.section.description') }}</p>
<span>{{ t('page.section.label') }}</span>
```

### 2. Button Text
```html
<button>{{ t('page.action.button') }}</button>
<a>{{ t('page.action.link') }}</a>
```

### 3. Input Placeholders
```html
<!-- Use property binding with square brackets -->
<input [placeholder]="t('page.form.placeholder')">
<textarea [placeholder]="t('page.form.textarea-placeholder')"></textarea>
```

### 4. Image Alt Text
```html
<img [alt]="t('page.image.alt-text')" src="...">
```

### 5. Tooltip/Title Attributes
```html
<button [title]="t('page.button.tooltip')">Icon</button>
<a [title]="t('page.link.tooltip')">Link</a>
```

### 6. Conditional Text with *ngIf
```html
<span *ngIf="condition">{{ t('page.message.success') }}</span>
<span *ngIf="!condition">{{ t('page.message.error') }}</span>
```

### 7. Dynamic Text (Interpolation)
For text that includes variables, you have options:

**Option A: Concatenate in template**
```html
<p>{{ t('page.welcome') }} {{  userName }}</p>
<!-- Translation: 'page.welcome': 'Welcome' -->
<!-- Result: "Welcome John" -->
```

**Option B: Create dynamic key (if needed)**
```typescript
getMessage(): string {
  return `${this.t('page.items.count')}: ${this.itemCount}`;
}
```

### 8. Validation Messages
```html
<div *ngIf="field.invalid && field.touched">
  <span *ngIf="field.errors?.['required']">
    {{ t('validation.field-required') }}
  </span>
  <span *ngIf="field.errors?.['email']">
    {{ t('validation.email-invalid') }}
  </span>
</div>
```

---

## Naming Convention for Translation Keys

Use a hierarchical structure with dots:

```
page.section.element.property

Examples:
✅ home.hero.title
✅ home.hero.subtitle
✅ home.hero.button-text
✅ contact.form.name-label
✅ contact.form.name-placeholder
✅ contact.validation.email-required
✅ about.mission.title
✅ about.mission.description
```

### Organizational Structure:
```
{pagename}.{section}.{element}

- pagename: home, about, contact, blog, portfolio, etc.
- section: hero, form, gallery, cta, stats, etc.
- element: title, subtitle, button, label, placeholder, etc.
```

---

## Common Pitfalls & Solutions

### ❌ Problem: Forgot square brackets on attributes
```html
<!-- WRONG -->
<input placeholder="t('key')">

<!-- CORRECT -->
<input [placeholder]="t('key')">
```

### ❌ Problem: Using {{ }} inside attributes
```html
<!-- WRONG -->
<input placeholder="{{ t('key') }}">

<!-- CORRECT -->
<input [placeholder]="t('key')">
```

### ❌ Problem: Translation key typo
```html
{{ t('home.hero.titl') }}  <!-- Typo: titl instead of title -->
```
**Solution**: The translate function will return the key itself as fallback, so you'll see "home.hero.titl" on screen.

### ❌ Problem: Forgot to inject TranslationService
```typescript
// WRONG
constructor() {}

// CORRECT
constructor(public translationService: TranslationService) {}
```

### ❌ Problem: Forgot to add t() method
```typescript
// WRONG - will get error "t is not a function"
export class MyPage {
  constructor(public translationService: TranslationService) {}
}

// CORRECT
export class MyPage {
  constructor(public translationService: TranslationService) {}
  
  t(key: string): string {
    return this.translationService.translate(key);
  }
}
```

---

## Testing Checklist

After adding translations to a page:

- [ ] TypeScript: TranslationService imported
- [ ] TypeScript: translationService injected in constructor
- [ ] TypeScript: t() method added
- [ ] Translation Service: All French keys added
- [ ] Translation Service: All English keys added
- [ ] HTML: All visible text uses {{ t('key') }}
- [ ] HTML: All placeholders use [placeholder]="t('key')"
- [ ] HTML: All alt text uses [alt]="t('key')"
- [ ] HTML: All tooltips use [title]="t('key')"
- [ ] Test: Switch to French - all text changes
- [ ] Test: Switch to English - all text changes
- [ ] Test: No console errors
- [ ] Test: No "key.name" showing on screen (means key not found)

---

## Quick Reference: Pages Status

| Page | Translation Status | Priority |
|------|-------------------|----------|
| Home | ✅ Partially Done | HIGH |
| About | ✅ Partially Done | HIGH |
| Contact | ✅ Partially Done | HIGH |
| Portfolio | ✅ Partially Done | MEDIUM |
| Annexes/Services | ❌ Todo | HIGH |
| Blog | ❌ Todo | MEDIUM |
| Calendar | ❌ Todo | MEDIUM |
| Service Details | ❌ Todo | MEDIUM |
| Reviews | ❌ Todo | LOW |
| Error Pages | ❌ Todo | LOW |

---

## Next Steps

1. Pick a page from the "Todo" list above
2. Follow the 3-Step Process at the top of this document
3. Test the translation button works
4. Move to the next page
5. Repeat until all pages are done

**Estimated time per page**: 30-60 minutes depending on content amount.

---

## Need Help?

Common issues:
1. **"t is not a function" error**: Add the t() method to your component
2. **Key name shows on screen**: Check for typos in translation keys
3. **Translation doesn't change**: Make sure key exists in BOTH fr and en
4. **Attribute not translating**: Use square brackets [attribute]="t('key')"

Happy translating! 🌐
