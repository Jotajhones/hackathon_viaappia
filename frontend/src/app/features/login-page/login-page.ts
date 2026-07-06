import { Component, inject, OnInit, signal } from '@angular/core';
import { Incidents } from '../../core/models/incidents-model';
import { IncidentsService } from '../../core/services/incidents-service'
import { RouterLink } from '@angular/router';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit{

  private IncidentsService = inject(IncidentsService);

  incidents = signal<Incidents[]>([]);

  ngOnInit(): void {
    this.incidentsFindAll();
  }

  incidentsFindAll(): void {
    this.IncidentsService.findAll().subscribe({
      next: (res: any) => {
        const data = res.content;
        return this.incidents.set(data);
      },
      error: (err) => console.error(err)
    });
  }

}
