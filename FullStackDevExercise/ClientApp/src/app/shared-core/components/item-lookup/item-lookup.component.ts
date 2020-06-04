import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-core-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.css']
})
export class ItemLookupComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  @Input("config")
  config: ItemLookupConfiguration;
}

export class ItemLookupConfiguration {
  constructor(
    public searchProvider: <T>(searchText: string) => Observable<T[]>,
    public templateProvider: <T>(dataItem: T) => string
  ) { }
}
