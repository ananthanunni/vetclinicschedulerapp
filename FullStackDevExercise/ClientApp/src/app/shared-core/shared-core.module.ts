import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from './components/footer/footer.component';
import { GridDataEditViewModalComponent } from './components/grid-data-edit-view-modal/grid-data-edit-view-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SimpleGridComponent } from './components/simple-grid/simple-grid.component';
import { AuthenticationService } from './services/authentication.service';
import { DialogService } from './services/dialog.service';
import { HttpHelperService } from './services/http-helper.service';
import { MetaService } from './services/meta.service';
import { StorageService } from './services/storage.service';
import { ToastrModule } from 'ngx-toastr';
import { ThrobberComponent } from './components/throbber/throbber.component';
import { GridDialogService } from './services/grid-dialog.service';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, SimpleGridComponent, ModalComponent, GridDataEditViewModalComponent, ThrobberComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgbModalModule,
    NgbToastModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    SimpleGridComponent,
    ModalComponent,
    ThrobberComponent
  ],
  providers: [
    MetaService,
    AuthenticationService,
    StorageService,
    HttpHelperService,
    DialogService,
    GridDialogService
  ],
  entryComponents: [
    ModalComponent,
    GridDataEditViewModalComponent
  ]
})
export class SharedCoreModule { }
