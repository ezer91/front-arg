import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/entities/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  public educaciones:Educacion[]=[];
  public editarEducacion:Educacion | undefined;
  public deleteEducacion:Educacion | undefined;
  public visible: boolean = false;


  constructor(private educacionService:EducacionService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.obtenerEducacion();
    this.visibilidad();
  }
  visibilidad() {
    if (this.tokenService.IsAdmin()){
      this.visible= true;
    }else{
      this.visible= false;
    }
  }

  public obtenerEducacion():void{
    this.educacionService.obtenerEducacion().subscribe({
      next:(Response:Educacion[]) =>{
      this.educaciones=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    });
  }

    public onOpenModal(mode:String, educacion?: Educacion):void{
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      if(!this.tokenService.IsAdmin()){
      }else{
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      if(mode==='add'){
        button.setAttribute('data-target','#addEducacionModal');
      }else if(mode==='delete'){
        this.deleteEducacion=educacion;
        button.setAttribute('data-target','#deleteEducacionModal');
      }else if(mode==='edit'){
        this.editarEducacion=educacion;
        button.setAttribute('data-target','#editEducacionModal');
      }
      container?.appendChild(button); 
      button.click();
    }
    }


    public onAddEducacion(addForm: NgForm):void{
      document.getElementById('add-educacion-form')?.click();
      this.educacionService.addEducacion(addForm.value).subscribe({
        next: (response:Educacion) =>{
          console.log(response);
          this.obtenerEducacion();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message)
          addForm.reset();
        }
      })
    }

    public onUpdateEducacion(educacion: Educacion){
      this.editarEducacion=educacion;
      document.getElementById('add-educacion-form')?.click();
      this.educacionService.updateEducacion(educacion).subscribe({
        next: (response:Educacion) =>{
          console.log(response);
          this.obtenerEducacion();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message)
        }
      })
    }

    public onDeleteEducacion(idEdu:number):void{
      this.educacionService.deleteEducacion(idEdu).subscribe({
        next: (response:void) =>{
          console.log(response);
          this.obtenerEducacion();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message)
        }
      })
    }

}