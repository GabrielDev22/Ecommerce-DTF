import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CreateUser, RolesApp } from '../model/authModel';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule, NgSelectModule, HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  
  loading: boolean = false;
  menuOption : string = '';
  myForm!: UntypedFormGroup;
  usernamePattern: string;
  rolesOptions = [RolesApp.COMPRADOR, RolesApp.VENDEDOR];
  selectedRoles: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router : Router,
    private authService : AuthService,
  ){
    this.usernamePattern = '^[a-zA-Z0-9_-]{3,15}$';
  }

  ngOnInit(){
    this.initForm();
  }

  private initForm(createUser? : CreateUser){
     this.myForm = this.fb.group({
        name: [createUser?.name || '', Validators.required, Validators.pattern(this.usernamePattern)],
        lastName: [createUser?.lastName, Validators.compose([Validators.required])],
        correo: ['', Validators.required, Validators.pattern('^[a-zA-Z]+(?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')],
        username: [createUser?.username, Validators.compose([Validators.required])],
        password: [createUser?.password, Validators.compose([Validators.required])],
        rolesApp: [createUser?.rolesApp, Validators.compose([Validators.required])]
     })
  }

  onSubmit(){
      let formValue = this.myForm.value;
      if(!Array.isArray(formValue.rolesApp)){
        formValue.rolesApp = [formValue.rolesApp];
      }
      if(this.myForm.invalid){
        this.myForm.markAllAsTouched();
        return;
      }
      this.authService.createUser(formValue).subscribe(res => {
        if(res == 200){
          this.router.navigate(['/login']);
        }
      })
  }

  onOption(menuOption: string){
    this.router.navigate([menuOption]);
    this.menuOption = menuOption;
  }

}
