import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidents } from '../models/incidents-model';

@Injectable({
    providedIn: 'root'
})
export class IncidentsService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/incidents';

    findAll(): Observable<Incidents[]> {
        return this.http.get<Incidents[]>(this.apiUrl);
    }
}