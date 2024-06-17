import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/authModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  menuOption: string = '/login';
  myForm!: UntypedFormGroup;

  constructor(
    private router : Router,
    private authService : AuthService,
    private fb: UntypedFormBuilder,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(loginRequest?: LoginRequest){
    this.myForm = this.fb.group({
      username: [loginRequest?.username, Validators.compose([Validators.required])],
      password: [loginRequest?.password, Validators.compose([Validators.required])]
    })
  }

  onSubmit(): void{
    this.authService.login(this.myForm.value).subscribe(res =>{
      console.log(res);
      if(res && res.status == true){
        this.router.navigate(['/home']);
      }else{
        console.log("Login fallido");
      }
    })
  }

  onOption(menuOption: string){
    this.router.navigate([menuOption]);
  }

}
