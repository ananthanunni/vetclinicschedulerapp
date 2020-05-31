import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from '../owners/owners.routes';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { HomeComponent } from './components/home/home.component';
import { OwnerListComponent } from './components/owner-list/owner-list.component';
import { OwnerService } from './services/owner.service';
import { OwnerEditorComponent } from './components/owner-editor/owner-editor.component';

@NgModule({
  declarations: [OwnerListComponent, HomeComponent, OwnerEditorComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    OwnerService
  ]
})
export class OwnersModule { }
