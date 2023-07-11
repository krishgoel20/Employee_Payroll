import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form!: any;
  constructor(private formBuilder: FormBuilder, private service:ServiceService, private router:Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      // Handle form submission
      console.log(this.form.value);
      let data = this.form.value;
      this.service.postSignup(data).subscribe((res:any)=>{
          console.log("res", res);
          this.router.navigateByUrl("")
      },error=>{
        console.log(error)
      })
    }
  }

}
