import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      (data:any) => {
        console.log(data);
        if(data.success){
          this.authService.storeUserData(data.token, data.user);
        }
      },
      (err) => {console.log(err)}
    );
  }

  logout() {
    this.authService.logout();
  }
}
