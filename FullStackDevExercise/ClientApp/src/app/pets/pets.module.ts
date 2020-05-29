import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './pets.routes';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetsListItemComponent } from './components/pets-list-item/pets-list-item.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { HomeComponent } from './components/home/home.component';
import { PetService } from './services/pet.service';



@NgModule({
  declarations: [HomeComponent, PetsListComponent, PetsListItemComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PetService
  ]
})
export class PetsModule { }
