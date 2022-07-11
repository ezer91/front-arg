import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'process';
import { Persona } from "../entities/Persona.1";

@Injectable({
  providedIn: 'root'
})
export class PortfolioapService {

  private apiServerUrl = 'http://localhost:8080';



  //private apiServerUrl= 'https://serene-basin-54168.herokuapp.com'

  constructor(private http: HttpClient) { }

  public verPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiServerUrl}/personas/ver`);
  }
}
