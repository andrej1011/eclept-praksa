import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingCreate } from '../models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/bookings`;

  create(data: BookingCreate): Promise<Booking> {
    return firstValueFrom(this.http.post<Booking>(this.base, data));
  }
  
  mine(): Promise<Booking[]> {
    return firstValueFrom(this.http.get<Booking[]>(`${this.base}/me`));
  }
  cancel(id: string): Promise<Booking> {
    return firstValueFrom(this.http.post<Booking>(`${this.base}/${id}/cancel`, {}));
  }
}