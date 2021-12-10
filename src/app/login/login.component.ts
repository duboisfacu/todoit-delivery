import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { catchError, empty, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  get f(){return this.loginForm.controls}

  submitForm(){
    this.li.login(this.loginForm.value.email,this.loginForm.value.password)
    .subscribe(resp => {
      if (resp.rol?.id == 2){
        localStorage.setItem("token", JSON.stringify(resp.id));
        localStorage.setItem("name", JSON.stringify(resp.fullName));
        this.navigate('home')
      } else{ 
        this.exist = true
        this.loginForm.controls['email'].setErrors({'incorrect': true});
        this.loginForm.controls['password'].setErrors({'incorrect': true}); 
      }
    }, error => {
      this.exist = true
      this.loginForm.controls['email'].setErrors({'incorrect': true});
      this.loginForm.controls['password'].setErrors({'incorrect': true});
    }
    )
  }

  public loginForm !: FormGroup;
  public exist = false;
  constructor(private router: Router, private fb: FormBuilder, private li: LoginService) {  }
  navigate(prop:string) {
    this.router.navigate([`/${prop}`]);
}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

}