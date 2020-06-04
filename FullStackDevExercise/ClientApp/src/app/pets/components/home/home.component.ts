import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetaService } from '../../../shared-core/services/meta.service';
import { StorageService } from '../../../shared-core/services/storage.service';

@Component({
  selector: 'pets-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  ownerId: number;
  ownerName: string;

  constructor(private router:Router,private activatedRoute: ActivatedRoute, private storageService: StorageService, private metaService:MetaService) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(r => {
      this.ownerId = parseInt(r.ownerId);
      debugger;
      this.ownerName = r.ownerName;
    });

    this.metaService.setTitle(`Pets List`);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
