import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../entities/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

    private apiServerUrl= 'http://localhost:8080'

  //private apiServerUrl= 'https://serene-basin-54168.herokuapp.com'
  
  constructor(private http:HttpClient) { }

  public obtenerExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/all`);
  }

  public crearExperiencia(experiencias: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/experiencia/add`,experiencias);
  }
  public editarExperiencia(experiencias: Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.apiServerUrl}/experiencia/update`,experiencias);
  }
  public borrarExperiencia(experienciasId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/delete/${experienciasId}`);
  }


}