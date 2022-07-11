import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService: TokenService,
    private router: Router,) { }

  ngOnInit() {
    this.isLogged=this.tokenService.isLogged();
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }
}