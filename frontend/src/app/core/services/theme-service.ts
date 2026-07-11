import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    const theme = this.isDarkMode() ? 'escuro' : 'claro';
    localStorage.setItem('app_theme', theme);
    this.applyTheme(theme);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme === 'escuro') {
      this.isDarkMode.set(true);
      this.applyTheme('escuro');
    } else {
      this.isDarkMode.set(false);
      this.applyTheme('claro');
    }
  }

  private applyTheme(theme: string) {
    if (theme === 'escuro') {
      document.documentElement.setAttribute('data-theme', 'escuro');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}