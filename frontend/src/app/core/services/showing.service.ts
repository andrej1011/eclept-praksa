import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Showing } from '../models/showing';

@Injectable({ providedIn: 'root' })
export class ShowingService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/showings`;
  get(id: string): Promise<Showing> {
    return firstValueFrom(this.http.get<Showing>(`${environment.apiUrl}/showings/${id}`));
  }
  list(): Promise<Showing[]> { 
    return firstValueFrom(this.http.get<Showing[]>(this.base)); 
  }
  create(d: ShowingInput): Promise<Showing> { 
    return firstValueFrom(this.http.post<Showing>(this.base, d)); 
  }
  update(id: string, d: Partial<ShowingInput>): Promise<Showing> { 
    return firstValueFrom(this.http.patch<Showing>(`${this.base}/${id}`, d)); 
  }
  remove(id: string): Promise<void> { 
    return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`)); 
  }
  cancel(id: string): Promise<Showing> { 
    return firstValueFrom(this.http.post<Showing>(`${this.base}/${id}/cancel`, {})); 
  }
}

export interface ShowingInput { 
  movie_id: string; 
  auditorium_id: string; 
  start_time: string; 
}