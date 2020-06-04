import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { DialogButton, DialogConfiguration, ModalComponent } from '../components/modal/modal.component';

@Injectable()
export class DialogService {
  constructor(private toaster: ToastrService, private modalService: NgbModal) { }

  showDeleteConfirmation(message = "Are you sure you wish to delete this item?", title = "Confirmation"): Observable<boolean> {
    return this.showDialog<boolean>(message, title, [
      new DialogButton(true, false, "fa fa-trash", "DELETE", true),
      new DialogButton(false, false, "", "Cancel"),
    ], true);
  }

  showDialog<T>(message: string, title: string, buttons: DialogButton[], isModal = false): Subject<T> {
    let modalRef = this.modalService.open(ModalComponent, { backdrop: isModal ? "static" : null });
    modalRef.componentInstance.config = new DialogConfiguration(
      message,
      title,
      buttons,
      !isModal
    );

    let subject = new Subject<T>();

    modalRef.result.then(r => { subject.next(r); subject.unsubscribe(); }, () => { subject.error(null); subject.unsubscribe(); });

    return subject;
  }

  showToast(message: string, type: "info" | "success" | "warning" | "error" = "info", title: string = null, duration: number = 3000) {
    switch (type) {
      case "success":
        this.toaster.success(message, title);
        break;

      case "info":
        this.toaster.info(message, title);
        break;

      case "warning":
        this.toaster.warning(message, title);
        break;

      case "error":
        this.toaster.error(message, title);
    }
  }
}
