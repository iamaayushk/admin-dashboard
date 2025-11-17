import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkMode.asObservable();

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const isDark = savedTheme === 'dark' || 
                   (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.setTheme(isDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkMode.value);
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}
