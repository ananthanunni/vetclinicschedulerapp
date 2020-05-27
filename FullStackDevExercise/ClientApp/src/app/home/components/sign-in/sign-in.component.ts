import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared-core/services/authentication.service';

@Component({
  selector: 'home-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  userName = "fakeUserName";
  password = "fakePassword";
  isSigningIn = false;

  async signIn() {
    this.isSigningIn = true;
    let isSuccess = await this.authService.authenticate(this.userName, this.password);

    if (isSuccess)
      this.router.navigate(["home"]);

    this.isSigningIn = false;
  }

  canSignIn() {
    return !this.isSigningIn && this.userName && this.password;
  }
}
