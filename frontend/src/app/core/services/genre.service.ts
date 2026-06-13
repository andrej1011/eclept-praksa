import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Genre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private http = inject(HttpClient);
  list(): Promise<Genre[]> {
    return firstValueFrom(this.http.get<Genre[]>(`${environment.apiUrl}/genres`));
  }
}