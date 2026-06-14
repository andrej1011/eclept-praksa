import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

export interface UserUpdate { 
    first_name?: string | null; 
    last_name?: string | null; 
    email?: string | null; 
    phone_number?: string | null;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/users`;

  updateProfile(d: UserUpdate): Promise<User> { 
    return firstValueFrom(this.http.patch<User>(`${this.base}/me`, d));
  }

  changePassword(old_password: string, new_password: string): Promise<void> { 
    return firstValueFrom(this.http.patch<void>(`${this.base}/me/password`, { old_password, new_password })); 
  }

  list(): Promise<User[]> { 
    return firstValueFrom(this.http.get<User[]>(this.base)); 
  }

  remove(id: string): Promise<void> { 
    return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`)); 
  }
  
}