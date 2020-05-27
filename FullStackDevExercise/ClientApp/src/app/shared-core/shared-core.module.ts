import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MetaService } from './services/meta.service';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent
  ],
  providers: [
    MetaService,
    AuthenticationService,
    StorageService
  ]
})
export class SharedCoreModule { }
