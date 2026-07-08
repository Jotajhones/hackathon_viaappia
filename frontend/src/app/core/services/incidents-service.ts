import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidents } from '../models/incidents-model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IncidentsService {

    private http = inject(HttpClient);
    private apiUrl = environment.API_URL;

    findAll(): Observable<Incidents[]> {
        return this.http.get<Incidents[]>(this.apiUrl);
    }

    create(incident: any){
        return this.http.post(this.apiUrl, incident);
    } 
}