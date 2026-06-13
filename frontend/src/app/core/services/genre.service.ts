import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Genre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/genres`;

  list(): Promise<Genre[]> { return firstValueFrom(this.http.get<Genre[]>(this.base)); }
  create(name: string): Promise<Genre> { return firstValueFrom(this.http.post<Genre>(this.base, { name })); }
  update(id: string, name: string): Promise<Genre> { return firstValueFrom(this.http.patch<Genre>(`${this.base}/${id}`, { name })); }
  delete(id: string): Promise<void> { return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`)); }
}