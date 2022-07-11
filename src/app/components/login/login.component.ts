import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/entities/loginUsuario';
import { AutenticacionService } from '../../services/autenticacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLogged = false;
  roles: string[] =[];
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  errMsj!: string;
  isLoginFail=false;

  constructor(
    private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private router: Router,
  
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.autenticacionService.login(this.loginUsuario).subscribe(
      data => {
        
        next:this.tokenService.setToken(data.token);
       
      
        this.router.navigate(['/portfolio']);
      },
      err => {
       error: this.errMsj = err.error.menssage;
      this.isLoginFail=true;
        
      }
    );
  }
  }
