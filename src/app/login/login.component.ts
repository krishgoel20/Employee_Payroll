import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service:ServiceService, private router:Router) {
    this.loginForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      userType:['', Validators.required]
    });
  }

  ngOnInit(){
    this.service.executableBatch().subscribe((res:any)=>{
      console.log("res", res);
    })
  }

  login() {
    console.log("this.loginForm.value", this.loginForm.value)
    if (this.loginForm.valid) {
     // Perform authentication logic here
      // Example: Send login request to backend API
      let data = this.loginForm.value;
      this.service.postLogin(data).subscribe((res:any)=>{
        console.log("res", res);
        if(res.message === "success"){
            localStorage.setItem('userRole', res.userType);
            localStorage.setItem('email_id', res.email_id);
            if(res.userType === 'user'){
              this.router.navigateByUrl('/user');
            }else if(res.userType === 'admin'){
              this.router.navigateByUrl('/admin');
            }
            

        }else{
          console.log(res);
        }
      }, error =>{
        console.log(error)
      })


    }
  }

}
