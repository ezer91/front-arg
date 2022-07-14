import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from "../entities/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

    private apiServerUrl= 'https://backendarg.herokuapp.com'
    
  constructor(private http:HttpClient) { }

  public verPersona():Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.apiServerUrl}/personas/ver`);
  }
  public actualizar(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.apiServerUrl}/personas/actualizar`,persona);
  }
  public deletePersona(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
}