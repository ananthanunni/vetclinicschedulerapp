import { Component, OnInit } from '@angular/core';
import { SimpleGridConfiguration, GridColumn, DataProviderRequesParameters } from '../../../shared-core/components/simple-grid/simple-grid.component';
import { Owner } from './Owner';
import { OwnerService } from '../../services/owner.service';

@Component({
  selector: 'owners-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  constructor(private ownersService: OwnerService) { }

  gridConfig: SimpleGridConfiguration<Owner> = null;

  columnDefs = [
    { headerName: 'Id', field: 'id' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' }
  ];

  ngOnInit(): void {
    this.createGridConfig();
    this.loadData();
  }

  private loadData() {
    this.ownersService.getOwners();
  }

  createGridConfig() {
    let config = new SimpleGridConfiguration<Owner>();

    config.canDelete = true;
    config.canEdit = true;
    config.columns = [
      new GridColumn<Owner>("Id", "id", "numeric", true),
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

    this.gridConfig = config;
  }
}
