import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  register(email: string, password: string): Observable<UserDto | null> {
    return this.httpClient.post(
      `${environment.api}/user/register`,
      {
        email,
        password,
      },
      {
        responseType: 'json',
        withCredentials: false,
      }
    ) as Observable<UserDto | null>;
  }

  login(email: string, password: string): Observable<UserDto | null> {
    return this.httpClient.get(`${environment.api}/user/login`, {
      responseType: 'json',
      withCredentials: true,
    }) as Observable<UserDto | null>;
  }

  logout() {
    return this.httpClient.get(`${environment.api}/user/logout`, {
      responseType: 'json',
      withCredentials: false,
    }) as Observable<never>;
  }

  getBoats() {
    return this.httpClient.get(`${environment.api}/boat/all`, {
      responseType: 'json',
      withCredentials: true,
    }) as Observable<BoatDto[]>;
  }

  addBoat(name: string, description: string) {
    return this.httpClient.post(
      `${environment.api}/boat`,
      { name, description },
      {
        responseType: 'json',
        withCredentials: true,
      }
    ) as Observable<BoatDto>;
  }

  editBoat(id: number, name: string, description: string) {
    return this.httpClient.put(
      `${environment.api}/boat`,
      { name, description, id },
      {
        responseType: 'json',
        withCredentials: true,
      }
    ) as Observable<BoatDto>;
  }

  deleteBoat(id: number) {
    return this.httpClient.delete(`${environment.api}/boat/${id}`, {
      responseType: 'json',
      withCredentials: true,
    }) as Observable<never>;
  }
}

export interface UserDto {
  email: string;
}

export interface BoatDto {
  id: number;
  name: string;
  description: string;
}
