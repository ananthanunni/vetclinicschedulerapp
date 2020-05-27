import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../AppConstants';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'shared-core-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(route:ActivatedRoute, private authService:AuthenticationService) { }
  ngOnInit(): void {
    
  }

  brand= AppConstants.appName;
}
