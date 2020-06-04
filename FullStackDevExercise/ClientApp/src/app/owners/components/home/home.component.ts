import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../../shared-core/services/meta.service';
import { StorageService } from '../../../shared-core/services/storage.service';
import { Router } from '@angular/router';
import { Owner } from '../../../shared-services/services/owner.service';

@Component({
  selector: 'owners-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private meta: MetaService, private router: Router, private storageService: StorageService) { }

  onViewPetsRequested(owner: Owner) {
    this.storageService.setValue("selectedOwner", JSON.stringify(owner));
    this.router.navigate(["owners", owner.id, "pets"]);
  }

  ngOnInit(): void {
    this.storageService.clearValue("selectedOwner");
    this.meta.setTitle("Owners");
  }

}
