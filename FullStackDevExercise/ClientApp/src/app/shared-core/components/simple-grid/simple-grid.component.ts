import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'shared-core-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.css']
})
export class SimpleGridComponent implements OnInit {
  constructor(private dialogService: DialogService) { }
  tableData: BehaviorSubject<RowDataItem<any>[]> = new BehaviorSubject<RowDataItem<any>[]>([]);

  async ngOnInit() {
    this.tableData.next(await (await this.configuration.dataProvider(new DataProviderRequesParameters())).map(r => new RowDataItem<any>(r)));
  }

  @Input("configuration")
  configuration: SimpleGridConfiguration<any>;

  hasActions() {
    return this.configuration.canDelete || this.configuration.canEdit;
  }

  hasData() {
    return !!this.tableData.value && this.tableData.value.length > 0;
  }

  onEditRequested(dataItem: RowDataItem<any>) {
    dataItem.beginEdit();

    this.dialogService.saveGridRow("Edit", this.configuration.columns, dataItem.data, this.configuration.onSave)
      .subscribe(r => {
        if (r.success == true) {
          dataItem.finishEdit(r.data);

          let currentData = this.tableData.value;
          this.tableData.next(currentData);

          this.dialogService.showToast("Item updated successfully.", "success");

          return;
        }

        debugger;

        dataItem.cancelEdit();
      },
        canceled => {
          this.dialogService.showToast("Error modifying record.", "success");

          dataItem.cancelEdit();
        });
  }

  onDeleteRequested(dataItem: RowDataItem<any>) {
    dataItem.isDeleting = true;

    this.dialogService.deleteConfirm("Are you sure to delete this item?", "Delete")
      .subscribe((deleteConfirmed) => {
        if (deleteConfirmed)
          this.configuration.onDeleteRequested(dataItem.data)
            .then(isDeleted => {
              if (isDeleted) {
                this.tableData.next(this.tableData.value.filter(r => r != dataItem));
                this.dialogService.showToast("Item deleted successfully.", "success");
              }
              else {
                dataItem.isDeleting = false;
                this.dialogService.showToast("Error deleting record.", "error");
              }
            });

        dataItem.isDeleting = false;
      });
  }

  onEditCommit(dataItem: RowDataItem<any>) {
    dataItem.finishEdit(dataItem);
  }
}

class RowDataItem<T> {
  constructor(public data: T) { }
  beginEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  finishEdit(data: T) {
    this.isEditing = false;
    this.data = data;
  }

  public isEditing = false;
  public isDeleting = false;
}

export class GridColumn<T> {
  constructor(public title: string, public fieldName: string, public type: "string" | "numeric" | "date" = "string", public isReadOnly = false, public templateProvider: (data: T) => string = (data: T) => data[this.fieldName]) { }
}

export class SimpleGridConfiguration<T> {
  constructor() {
  }

  columns: GridColumn<T>[];
  canDelete: boolean;
  canEdit: boolean;
  dataProvider: (parameters: DataProviderRequesParameters) => Promise<T[]>;

  onDeleteRequested: (data: T) => Promise<boolean>;
  onSave: (data: T) => Observable<any>;

  actions: GridAction<T>[];

  // TODO: Enhance later if required (optional priority task)
  //pagination: PaginationConfiguration;
}

export class GridAction<T> {
  constructor(
    public buttonCss: string = "",
    public iconCss: string = "",
    public label: string = "",
    public onClick: (data: T) => void) { }
}

//export class PaginationConfiguration {
//  size: number = 30;
//}

export class DataProviderRequesParameters {
  pageSize: number;
  pageNumber: number;
}
