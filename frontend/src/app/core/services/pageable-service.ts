// meu-servico.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageableResponse } from '../models/pageable-model';

@Injectable({ 
    providedIn: 'root' 
})
export class PageableService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.API_BASE_URL}`;

  listarDados(page: number, size: number): Observable<PageableResponse<any>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageableResponse<any>>(this.apiUrl, { params });
  }
}