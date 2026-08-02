import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Theme, FormationSummary } from '../model/annexes.model';
import { environment } from '../../environments/environment';

export interface ThemeCreateUpdateDto {
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  active: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private apiUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {
    console.log('📌 ThemeService initialized with API URL:', this.apiUrl);
  }

  /**
   * Get all active themes
   */
  getAllThemes(): Observable<Theme[]> {
    const url = `${this.apiUrl}/themes`;
    console.log('🌐 Fetching all themes:', url);
    return this.http.get<Theme[]>(url).pipe(
      tap(response => console.log('✅ Themes list received:', response)),
      catchError(error => {
        console.error('🚫 Error fetching themes:', error);
        return throwError(() => new Error('Erreur lors du chargement des thèmes'));
      })
    );
  }

  /**
   * Get themes with their formations for the annexes display
   */
  getThemesWithFormations(): Observable<Theme[]> {
    const url = `${this.apiUrl}/themes/with-formations`;
    console.log('🌐 Calling API:', url);
    return this.http.get<Theme[]>(url).pipe(
      tap(response => {
        console.log('✅ API Response received:', response);
        console.log('📊 Total themes:', response?.length || 0);
      }),
      catchError(error => {
        console.error('🚫 API Error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        return throwError(() => new Error(error.error?.message || 'Erreur lors du chargement des formations'));
      })
    );
  }

  /**
   * Get a single theme with its formations by slug
   */
  getThemeWithFormations(slug: string): Observable<Theme> {
    const url = `${this.apiUrl}/themes/${slug}/formations`;
    console.log('🌐 Fetching theme:', url);
    return this.http.get<Theme>(url).pipe(
      tap(response => console.log('✅ Theme loaded:', response)),
      catchError(error => {
        console.error('🚫 Error loading theme:', error);
        return throwError(() => new Error('Erreur lors du chargement du thème'));
      })
    );
  }

  /**
   * Get all formations (flat list) for dropdown selection
   */
  getAllFormations(): Observable<FormationSummary[]> {
    return this.http.get<FormationSummary[]>(`${this.apiUrl}/formations`);
  }

  // ========== ADMIN CRUD METHODS ==========

  /**
   * Create a new theme (Admin only)
   */
  createTheme(theme: ThemeCreateUpdateDto): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}/themes`, theme);
  }

  /**
   * Update an existing theme (Admin only)
   */
  updateTheme(id: number, theme: ThemeCreateUpdateDto): Observable<Theme> {
    return this.http.put<Theme>(`${this.apiUrl}/themes/${id}`, theme);
  }

  /**
   * Delete a theme (Admin only)
   */
  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/themes/${id}`);
  }

  /**
   * Get theme by ID for editing (Admin only)
   */
  getThemeById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.apiUrl}/themes/${id}`);
  }

  /**
   * Get all themes including inactive ones (Admin only)
   */
  getAllThemesAdmin(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes/admin`);
  }

  /**
   * Get all themes from admin endpoint with formations
   */
  getAdminThemesWithFormations(): Observable<Theme[]> {
    const url = `${this.apiUrl}/themes/admin`;
    console.log('🌐 Fetching admin themes:', url);
    return this.http.get<Theme[]>(url).pipe(
      tap(response => {
        console.log('✅ Admin themes received:', response);
        console.log('📊 Total admin themes:', response?.length || 0);
      }),
      catchError(error => {
        console.error('🚫 Error fetching admin themes:', error);
        return throwError(() => new Error(error.error?.message || 'Erreur lors du chargement des thèmes admin'));
      })
    );
  }

  /**
   * Fix themes - make sure they are active and have proper data
   */
  fixThemes(): Observable<any> {
    console.log('🔧 Calling fix API:', `${this.apiUrl}/fix/themes`);
    return this.http.post<any>(`${this.apiUrl}/fix/themes`, {}).pipe(
      tap(response => console.log('🔧 Fix Response:', response)),
      catchError(error => {
        console.error('🚫 Fix Error:', error);
        throw error;
      })
    );
  }

  /**
   * Upload theme icon image
   */
  uploadThemeIcon(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{url: string}>(`${this.apiUrl}/themes/upload-icon`, formData);
  }
}