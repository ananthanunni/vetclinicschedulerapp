import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from './services/pet.service';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { OwnerService } from './services/owner.service';
import { OwnerListComponent } from './components/owner-list/owner-list.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetsListItemComponent } from './components/pets-list-item/pets-list-item.component';



@NgModule({
  declarations: [OwnerListComponent, PetsListComponent, PetsListItemComponent],
  imports: [
    CommonModule,
    SharedCoreModule
  ],
  providers: [
    PetService,
    OwnerService
  ],
  exports: [
    OwnerListComponent,
    PetsListComponent
  ]
})
export class SharedServicesModule { }
