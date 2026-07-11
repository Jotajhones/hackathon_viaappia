import { Injectable, inject, signal } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.API_BASE_URL}/stats/incidents`;

    stats = signal<any>(null);

    loadStats() {
        this.http.get<any>(this.apiUrl).subscribe({
            next: (data) => {
                this.stats.set(data);
            },
            error: (err) => {
                console.error('Erro ao buscar as estatísticas', err);
            }
        });
    }
}