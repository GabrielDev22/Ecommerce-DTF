import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router : Router){}

  menuOption : string = '';

  onOption(menuOption: string){
    this.router.navigate([menuOption]);
    this.menuOption = menuOption;
  }

}
