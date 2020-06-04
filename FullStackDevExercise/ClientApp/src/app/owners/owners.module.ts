import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { SharedServicesModule } from '../shared-services/shared-services.module';
import { HomeComponent } from './components/home/home.component';
import { routes } from './owners.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    SharedServicesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedServicesModule
  ],
  providers: [
    
  ],
  exports: [
    
  ]
})
export class OwnersModule { }
