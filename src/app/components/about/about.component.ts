import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AcercaDe } from 'src/app/entities/acercaDe';
import { AcercaDeService } from '../../services/acerca-de.service';
import { __values } from 'tslib';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  public acercaDe:AcercaDe[]=[]
  public formVisibility = false
  public editAcercaDe:AcercaDe | undefined

  constructor(private AcercaDeService:AcercaDeService) { }
 

  ngOnInit(): void {
    this.obtenerAcercaDe();
  }

  public obtenerAcercaDe():void{
    this.AcercaDeService.obtenerAcercaDe().subscribe({
      next:(Response:AcercaDe[]) =>{
      this.acercaDe=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    });
  }
  
  onSubmit(acercaDe:AcercaDe):void {
      this.formVisibility=false;
      this.editAcercaDe=acercaDe;
      document.getElementById('texto')?.click();
      this.AcercaDeService.editarAcercaDe(acercaDe).subscribe({
        next: (response:AcercaDe) => {
          console.log(response);
          this.obtenerAcercaDe()
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message)
        }
      })
  }

  editarTexto(){
    console.log("llama a la funcion")
    this.formVisibility=true;
  }  

  cerrar(){
    this.formVisibility=false;
    
  }
}