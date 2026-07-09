import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IncidentsService {

    private http = inject(HttpClient);
    private apiUrl = environment.API_URL;

    findAll(page: number = 0, size: number = 20): Observable<any> {

        const params = new HttpParams()
            .set('page', page)
            .set('size', size);
        return this.http.get<any>(this.apiUrl, { params });
    }

    create(incident: any) {
        return this.http.post(this.apiUrl, incident);
    }

    update(incident: any) {
        let url = this.apiUrl + "/" + incident.id;
        return this.http.put(url, incident);
    }

    delete(id: any) {
        let url = this.apiUrl + "/" + id;
        return this.http.delete(url);
    }

    findById(id: any) {
        let url = this.apiUrl + "/" + id;
        return this.http.get(url);
    }
}