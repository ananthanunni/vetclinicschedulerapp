import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DataProviderRequesParameters, GridAction, GridColumn, SimpleGridConfiguration } from '../../../shared-core/components/simple-grid/simple-grid.component';
import { OwnerService, Owner } from '../../../shared-services/services/owner.service';

@Component({
  selector: 'shared-services-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  constructor(private ownersService: OwnerService) { }

  gridConfig: SimpleGridConfiguration<Owner> = null;

  @Output("onViewPetsRequested")
  onViewPetsRequested = new EventEmitter<Owner>();

  @Input("isLookupMode")
  isLookupMode = false;

  @Output("onItemSelected")
  onItemSelected = new EventEmitter<Owner>();

  ngOnInit(): void {
    this.createGridConfig();
  }

  createGridConfig() {
    let config = new SimpleGridConfiguration<Owner>();

    config.canDelete = !this.isLookupMode;
    config.canEdit = !this.isLookupMode;
    config.canCreate = true;

    config.columns = [
      new GridColumn<Owner>("Id", "id", "number", true),
      new GridColumn<Owner>("First Name", "firstName"),
      new GridColumn<Owner>("Last Name", "lastName"),
    ];

    if (this.isLookupMode)
      config.actions = [
        new GridAction<Owner>("btn btn-primary", "", "SELECT", (data) => this.onItemSelected.emit(data))
      ];
    else
      config.actions = [
        new GridAction<Owner>(
          "btn btn-info",
          "fas fas-paw",
          "Pets...",
          (data) => {
            this.onViewPetsRequested.emit(data);
          })
      ];

    config.dataProvider = (parameters: DataProviderRequesParameters) => this.ownersService.getOwners().toPromise();
    config.onDeleteRequested = (data: Owner) => new Promise<boolean>(resolve => {
      this.ownersService.deleteOwner(data.id).subscribe(
        r => {
          resolve(true)
        }),
        r => {
          resolve(false);
        }
    });

    config.onSave = (data: Owner) => this.ownersService.save(data);

    this.gridConfig = config;
  }
}
