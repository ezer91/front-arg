import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/entities/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  public experiencias:Experiencia[]=[];
  public editarExperiencia:Experiencia | undefined;
  public deleteExperiencia:Experiencia | undefined;

  constructor(private experienciaService:ExperienciaService ) { }

  ngOnInit(): void {
    this.obtenerExperiencia();
  }
  public obtenerExperiencia():void{
    this.experienciaService.obtenerExperiencia().subscribe({
      next:(Response:Experiencia[]) =>{
      this.experiencias=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      } 
    });
  }

  public onOpenModal(mode:String, experiencia?: Experiencia):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addExperienciaModal');
    }else if(mode==='delete'){
      this.deleteExperiencia=experiencia;
      button.setAttribute('data-target','#deleteExperienciaModal');
    }else if(mode==='edit'){
      this.editarExperiencia=experiencia;
      button.setAttribute('data-target','#editExperienciaModal');
    }
    container?.appendChild(button); 
    button.click();
    console.log("llama a la funcion");
  }

  public onAddExperiencia(addForm: NgForm):void{
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.crearExperiencia(addForm.value).subscribe({
      next: (response:Experiencia) =>{
        console.log(response);
        this.obtenerExperiencia();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
        addForm.reset();
      }
    })
  }

  public onUpdateExperiencia(experiencia: Experiencia){
    this.editarExperiencia=experiencia;
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.editarExperiencia(experiencia).subscribe({
      next: (response:Experiencia) =>{
        console.log(response);
        this.obtenerExperiencia();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

  public onDeleteExperiencia(idExp:number):void{
    this.experienciaService.borrarExperiencia(idExp).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.obtenerExperiencia();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

}
