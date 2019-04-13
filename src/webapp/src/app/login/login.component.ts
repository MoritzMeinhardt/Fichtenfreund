import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {AlertService} from '../shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      (data: any) => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.alertService.addAlert({message: 'Welcome back ' + data.user.username + '!', type: 'success'});
        }
      },
      (err) => {
        this.alertService.addAlert({message: 'Try again.', type: 'danger'}); }
    );
  }

  logout() {
    this.authService.logout();
  }
}
