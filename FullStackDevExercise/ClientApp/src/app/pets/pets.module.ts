import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { SharedServicesModule } from '../shared-services/shared-services.module';
import { HomeComponent } from './components/home/home.component';
import { routes } from './pets.routes';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    SharedServicesModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class PetsModule { }
