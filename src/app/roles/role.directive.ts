import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '../services/token.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {


  constructor(
    private readonly elRef: ElementRef,
    private tokenService: TokenService 
    ) { }

 @HostListener('click', ['$event'])
 appRole(event: Event): void{ 
  if (!this.tokenService.IsAdmin()){
    event.target
    alert("No tienes permiso para esto")
  }
  
 }   
}