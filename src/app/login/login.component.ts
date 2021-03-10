import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../utils/authentication.service';
import {SnackbarService} from '../../utils/snackbar-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              private authService: AuthenticationService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.form.value.username.trim(), this.form.value.password);
  }
}
