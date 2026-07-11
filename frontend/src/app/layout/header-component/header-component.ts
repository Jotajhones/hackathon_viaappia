import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth-service';
import { ThemeService } from '../../core/services/theme-service';
import { StatsService } from '../../core/services/stats-service';
import { StatsConteinerComponent } from '../../shared/stats-conteiner-component/stats-conteiner-component';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, RouterLinkActive, StatsConteinerComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  
  statsService = inject(StatsService);
  themeService = inject(ThemeService);

  userEmail: string | null = null;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.userEmail = this.authService.getUserEmail();

      this.statsService.loadStats();
      
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.router.navigate(["/login"]);
    return this.authService.logout();
  }

  alterarTema() {
    this.themeService.toggleTheme();
  }
}