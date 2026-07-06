import { Component, inject, OnInit, signal } from '@angular/core';
import { Incidents } from '../../core/models/incidents-model';
import { IncidentsService } from '../../core/services/incidents-service'

@Component({
  selector: 'app-workspace-page',
  imports: [],
  templateUrl: './workspace-page.html',
  styleUrl: './workspace-page.css',
})
export class WorkspacePage implements OnInit {

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
