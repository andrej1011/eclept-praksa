import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auditorium } from '../models/auditorium';

export interface AuditoriumInput { name: string; capacity: number; }

@Injectable({ providedIn: 'root' })
export class AuditoriumService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/auditoriums`;

  list(): Promise<Auditorium[]> { return firstValueFrom(this.http.get<Auditorium[]>(this.base)); }
  create(d: AuditoriumInput): Promise<Auditorium> { return firstValueFrom(this.http.post<Auditorium>(this.base, d)); }
  update(id: string, d: AuditoriumInput): Promise<Auditorium> { return firstValueFrom(this.http.patch<Auditorium>(`${this.base}/${id}`, d)); }
  delete(id: string): Promise<void> { return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`)); }
}