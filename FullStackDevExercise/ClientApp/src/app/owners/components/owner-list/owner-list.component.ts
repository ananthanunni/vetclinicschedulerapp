import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataProviderRequesParameters, GridAction, GridColumn, SimpleGridConfiguration } from '../../../shared-core/components/simple-grid/simple-grid.component';
import { Owner, OwnerService } from '../../services/owner.service';

@Component({
  selector: 'owners-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  constructor(private ownersService: OwnerService) { }

  gridConfig: SimpleGridConfiguration<Owner> = null;

  @Output("onViewPetsRequested")
  onViewPetsRequested = new EventEmitter<Owner>();

  ngOnInit(): void {
    this.createGridConfig();
  }

  createGridConfig() {
    let config = new SimpleGridConfiguration<Owner>();

    config.canDelete = true;
    config.canEdit = true;
    config.columns = [
      new GridColumn<Owner>("Id", "id", "number", true),
      new GridColumn<Owner>("First Name", "firstName"),
      new GridColumn<Owner>("Last Name", "lastName"),
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

    config.actions = [
      new GridAction<Owner>(
        "btn btn-info",
        "fas fas-paw",
        "Pets...",
        (data) => {
          this.onViewPetsRequested.emit(data);
        })
    ];

    this.gridConfig = config;
  }
}
