import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../entities/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
    
    private apiServerUrl= 'http://localhost:8080'
  //private apiServerUrl= 'https://serene-basin-54168.herokuapp.com'

  constructor(private http:HttpClient) { }

  public obtenerProyectos():Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/Proyectos/all`);
  }

  public addProyectos(proyectos: Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(`${this.apiServerUrl}/Proyectos/add`,proyectos);
  }
  public editarProyectos(proyectos: Proyectos):Observable<Proyectos>{
    return this.http.put<Proyectos>(`${this.apiServerUrl}/Proyectos/update`,proyectos);
  }
  public borrarProyectos(proyectosId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Proyectos/delete/${proyectosId}`);
  }
}