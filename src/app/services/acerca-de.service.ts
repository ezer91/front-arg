import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDe } from '../entities/acercaDe';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {

    private apiServerUrl= 'https://backendarg.herokuapp.com'
  
  constructor(private http:HttpClient) { }

  public obtenerAcercaDe():Observable<AcercaDe[]>{
    return this.http.get<AcercaDe[]>(`${this.apiServerUrl}/about/all`);
  }

  public editarAcercaDe(acercaDe: AcercaDe):Observable<AcercaDe>{
    return this.http.put<AcercaDe>(`${this.apiServerUrl}/about/update`,acercaDe);
  }

 
}