import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from '../../../AppConstants';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'shared-core-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  private authStatusSubscription: Subscription;
  currentUser: string;
  authenticatedUserSubscription: Subscription;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.isAuthenticated.subscribe(r => this.isAuthenticated = r);
    this.authenticatedUserSubscription = this.authService.authenticatedUser.subscribe(r => this.currentUser = r);
  }

  brand = AppConstants.appName;

  signOut() {
    this.authService.signOut();
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
    this.authenticatedUserSubscription.unsubscribe();
  }
}
