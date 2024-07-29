import { Component } from '@angular/core';
import { HomeComponent } from "../../home/home.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [HomeComponent, CommonModule, RouterLink, RouterModule,],
  templateUrl: './vender.component.html',
  styleUrl: './vender.component.css'
})
export class VenderComponent {

}
