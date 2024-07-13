import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../Auth/auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
  ){}

    ngOnInit() {
    }

    logout(){
      this.authService.logout().subscribe(res => {
        this.router.navigate(['/login']);
      })
    }

}
