import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents-service';
import { catchError, of } from 'rxjs';

export const incidentResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const incidentsService = inject(IncidentsService);
  const router = inject(Router);
  
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/workspace']);
    return of(null);
  }

  return incidentsService.findById(id).pipe(
    catchError((err) => {
      console.error('Erro no Resolver:', err);
      router.navigate(['**']); 
      return of(null);
    })
  );
};