import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/entities/nuevoUsuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
 nuevoUsuario!: NuevoUsuario;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  errMsj!: string;
 
  isRegister=false;
  isRegisterFail=false;

  constructor(
    private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isRegister = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.autenticacionService.nuevo(this.nuevoUsuario).subscribe(
      _data => {
        this.isRegister=true;
        this.isRegisterFail=false;

        this.router.navigate(['/login']);
      },
      err => {
        this.isRegister=false;
        this.isRegisterFail=true;
        this.errMsj = err.error.menssage;
        
      }
    );
  }

}