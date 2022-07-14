import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'process';
import { Persona } from "../entities/persona";

@Injectable({
  providedIn: 'root'
})
export class PortfolioapService {

  private apiServerUrl = 'https://backendarg.herokuapp.com';

  constructor(private http: HttpClient) { }

  public verPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiServerUrl}/personas/ver`);
  }
}
