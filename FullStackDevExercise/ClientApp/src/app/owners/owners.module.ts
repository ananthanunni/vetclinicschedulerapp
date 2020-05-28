import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from '../owners/owners.routes';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { HomeComponent } from './components/home/home.component';
import { OwnerListComponent } from './components/owner-list/owner-list.component';

@NgModule({
  declarations: [OwnerListComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OwnersModule { }
