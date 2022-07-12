import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/entities/skills';
import { SkillsService } from 'src/app/services/skills.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public skills:Skills[]=[];
  public editarSkills:Skills | undefined;
  public deleteSkills:Skills | undefined;
  public visible: boolean = false

  constructor(private skillsService:SkillsService,private tokenService:TokenService ) { }

  ngOnInit( ): void {
    this.obtenerSkills();
    this.visibilidad();
  }

  public obtenerSkills():void{
    this.skillsService.obtenerSkills().subscribe({
      next:(Response:Skills[]) =>{
      this.skills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    });
  }

  public visibilidad(){
    if (this.tokenService.IsAdmin()){
      this.visible= true;
  }else{
    this.visible= false;
  }
}

  public onOpenModal(mode:String, skills?: Skills):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    if(!this.tokenService.IsAdmin()){
    }else{
      button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addSkillsModal');
    }else if(mode==='delete'){
      this.deleteSkills=skills;
      button.setAttribute('data-target','#deleteSkillsModal');
    }else if(mode==='edit'){
      this.editarSkills=skills;
      button.setAttribute('data-target','#editSkillsModal');
    }
    container?.appendChild(button); 
    button.click();
    }
  }

  public onAddSkills(addForm: NgForm):void{
    document.getElementById('add-skills-form')?.click();
    this.skillsService.addSkills(addForm.value).subscribe({
      next: (response:Skills) =>{
        console.log(response);
        this.obtenerSkills();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
        addForm.reset();
      }
    })
  }

  public onUpdateSkills(skills: Skills){
    this.editarSkills=skills;
    document.getElementById('add-skills-form')?.click();
    this.skillsService.editarSkills(skills).subscribe({
      next: (response:Skills) =>{
        console.log(response);
        this.obtenerSkills();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

  public onDeleteSkills(idSkill:number):void{
    this.skillsService.borrarSkills(idSkill).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.obtenerSkills();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

}