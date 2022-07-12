import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';
import { Proyectos } from '../../entities/proyectos'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public proyectos:Proyectos[]=[];
  public editarProyectos:Proyectos | undefined;
  public deleteProyectos:Proyectos | undefined;
  public visible: boolean = false
  
  constructor(private proyectosService:ProyectosService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
    this.visibilidad();
  }

  public obtenerProyectos():void{
    this.proyectosService.obtenerProyectos().subscribe({
      next:(Response:Proyectos[]) =>{
      this.proyectos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message) 
      }
    });
  }

  public visibilidad(){
    if(this.tokenService.IsAdmin()){
      this.visible=true;
    }else{
      this.visible=false;
    }
  }
  public onOpenModal(mode:String, proyectos?: Proyectos):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    if(!this.tokenService.IsAdmin()){
    }else{
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      if(mode==='add'){
        button.setAttribute('data-target','#addProyectosModal');
      }else if(mode==='delete'){
        this.deleteProyectos=proyectos;
        button.setAttribute('data-target','#deleteProyectosModal');
      }else if(mode==='edit'){
        this.editarProyectos=proyectos;
        button.setAttribute('data-target','#editProyectosModal');
      }
      container?.appendChild(button); 
      button.click();
    }
  }

  public onAddProyectos(addForm: NgForm):void{
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe({
      next: (response:Proyectos) =>{
        console.log(response);
        this.obtenerProyectos();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
        addForm.reset();
      }
    })
  }

  public onUpdateProyectos(proyectos: Proyectos){
    this.editarProyectos=proyectos;
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.editarProyectos(proyectos).subscribe({
      next: (response:Proyectos) =>{
        console.log(response);
        this.obtenerProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

  public onDeleteProyectos(id:number):void{
    this.proyectosService.borrarProyectos(id).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.obtenerProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

}
