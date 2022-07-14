import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NuevoUsuario } from '../entities/nuevoUsuario';
import { LoginUsuario } from '../entities/loginUsuario';
import { JwtDto } from '../entities/jwtDto';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiServerUrl= 'https://backendarg.herokuapp.com/auth/'


  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.apiServerUrl + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.apiServerUrl + 'login', loginUsuario);
  }
}
