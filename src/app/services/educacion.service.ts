import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../entities/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
    private apiServerUrl= 'http://localhost:8080'
  //private apiServerUrl= 'https://serene-basin-54168.herokuapp.com'
  
  constructor(private http:HttpClient) { }

  public obtenerEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/all`);
  }

  public addEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/educacion/add`,educacion);
  }
  public updateEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/update`,educacion);
  }
  public deleteEducacion(educacionId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/delete/${educacionId}`);
  }
}