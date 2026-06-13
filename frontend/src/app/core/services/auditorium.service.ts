import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auditorium } from '../models/auditorium';

@Injectable({ providedIn: 'root' })
export class AuditoriumService {
  private http = inject(HttpClient);
  list(): Promise<Auditorium[]> {
    return firstValueFrom(this.http.get<Auditorium[]>(`${environment.apiUrl}/auditoriums`));
  }
}