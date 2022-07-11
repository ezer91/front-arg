import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from "src/app/entities/persona";
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public personas:Persona[]=[];
  formVisibility:boolean = false;
  formVisibility2:boolean = false;
  public editPersona:Persona | undefined
 

  constructor(private personaService:PersonaService, private tokenService: TokenService ) { }

  ngOnInit(): void {
    this.verPersona();
  }
  public verPersona():void{
    this.personaService.verPersona().subscribe({
      next:(Response:Persona[]) =>{
      this.personas=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    }); 
  }

  onSubmit(persona:Persona):void {
    this.formVisibility=false; //Cierra El Formulario
    this.editPersona=persona;
    document.getElementById('imagen')?.click();
    this.personaService.actualizar(persona).subscribe({
      next: (response:Persona) => {
        console.log(response);
        this.verPersona()
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
}
onSubmit2(persona:Persona):void {
  this.formVisibility2=false; //Cierra El Formulario
  this.editPersona=persona;
  document.getElementById('banner')?.click();
  this.personaService.actualizar(persona).subscribe({
    next: (response:Persona) => {
      console.log(response);
      this.verPersona()
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message)
    }
  })
}

//Abre el formulario
editarFoto(){
  console.log("funciona")
  this.formVisibility=true;
}
editarBanner(){
  console.log("funciona")
  this.formVisibility2=true;

}

}