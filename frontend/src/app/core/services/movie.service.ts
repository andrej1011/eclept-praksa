import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie, MovieFilter } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/movies`;

  list(filter: MovieFilter = {}): Promise<Movie[]> {
    let params = new HttpParams();
    for (const [k, v] of Object.entries(filter)) {
      if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
    }
    return firstValueFrom(this.http.get<Movie[]>(this.base, { params }));
  }

  get(id: string): Promise<Movie> {
    return firstValueFrom(this.http.get<Movie>(`${this.base}/${id}`));
  }
}