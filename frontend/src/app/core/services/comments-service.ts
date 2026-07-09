import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    private http = inject(HttpClient);
    private apiUrl = environment.API_URL;

    findAllByIncidentsId(id: string, page: number = 0, size: number = 20): Observable<any> {

        const url = `${this.apiUrl}/${id}/comments`
        const params = new HttpParams()
            .set('page', page)
            .set('size', size);
        return this.http.get<any>(url, { params });
    }
}