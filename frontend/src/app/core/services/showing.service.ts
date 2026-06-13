import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Showing } from '../models/showing';

@Injectable({ providedIn: 'root' })
export class ShowingService {
  private http = inject(HttpClient);
  get(id: string): Promise<Showing> {
    return firstValueFrom(this.http.get<Showing>(`${environment.apiUrl}/showings/${id}`));
  }
}