import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CreateUser, RolesApp } from '../model/authModel';
import { FormGroup, FormsModule, NgSelectOption, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  rolesOptions = [RolesApp.COMPRADOR, RolesApp.VENDEDOR];
  selectedRoles: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router : Router,
    private authService : AuthService,
  ){}

  ngOnInit(){
    this.initForm();
  }

  private initForm(createUser? : CreateUser){
     this.myForm = this.fb.group({
        name: [createUser?.name, Validators.compose([Validators.required])],
        lastName: [createUser?.lastName, Validators.compose([Validators.required])],
        correo: [createUser?.correo, Validators.compose([Validators.required])],
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
          this.onOption('login');
        }
      })
  }

  onOption(menuOption: string){
    this.router.navigate([menuOption]);
    this.menuOption = menuOption;
  }


}
