import { Component } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router : Router){}

  menuOption: string = '/login';

  onOption(menuOption: string){
    this.router.navigate([menuOption]);
  }

}
