import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { GridDataEditViewDialogConfiguration, GridDataEditViewModalComponent } from '../components/grid-data-edit-view-modal/grid-data-edit-view-modal.component';
import { DialogButton, DialogConfiguration, ModalComponent } from '../components/modal/modal.component';
import { GridColumn } from '../components/simple-grid/simple-grid.component';

@Injectable()
export class GridDialogService {

  constructor(private modalService:NgbModal) { }


  deleteConfirm(message: string, title: string): Observable<boolean> {
    let modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.config = new DialogConfiguration(
      message || "Are you sure you wish to delete this item?",
      title || "Confirm",
      [
        new DialogButton(true, false, "fa fa-trash", "DELETE", true),
        new DialogButton(false, false, "", "Cancel"),
      ]);

    let subject = new Subject<boolean>();

    modalRef.result.then(r => { subject.next(r === true); subject.unsubscribe(); }, r => { subject.next(false); subject.unsubscribe(); });

    return subject;
  }

  saveGridRow<T>(title: string, columns: GridColumn<T>[], data: T, onSave: (data: T) => Observable<boolean>) {
    let modalRef = this.modalService.open(GridDataEditViewModalComponent);
    modalRef.componentInstance.config = new GridDataEditViewDialogConfiguration(
      title,
      columns,
      data,
      onSave
    );

    let subject = new Subject<{ success: boolean, data: T }>();

    modalRef.result.then(
      (r: { success: boolean, data: T }) => { subject.next(r); subject.unsubscribe(); },
      (r => { subject.error("canceled"); subject.unsubscribe(); }));

    return subject;
  }
}
