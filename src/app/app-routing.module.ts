import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { GuardGuard} from './services/guard.guard';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path:'registrarse', component: RegistrarseComponent, canActivate: [LoginGuard]},
  {path:'portfolio', component: PortfolioComponent, canActivate: [GuardGuard], data:{expectedRol:['admin','user']}},
  {path:'**', redirectTo:'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
