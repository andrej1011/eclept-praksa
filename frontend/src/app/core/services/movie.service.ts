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
  create(d: MovieInput): Promise<Movie> { 
    return firstValueFrom(this.http.post<Movie>(this.base, d)); 
  }
  update(id: string, d: Partial<MovieInput>): Promise<Movie> { 
    return firstValueFrom(this.http.patch<Movie>(`${this.base}/${id}`, d)); 
  }
  remove(id: string): Promise<void> { 
    return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`)); 
  }
}

export interface MovieInput {
  name: string;
  available: boolean;
  duration: number;
  poster_url?: string | null;
  short_description?: string | null;
  release_date?: string | null;   // YYYY-MM-DD
  imdb_link?: string | null;
  genre_ids: string[];
}