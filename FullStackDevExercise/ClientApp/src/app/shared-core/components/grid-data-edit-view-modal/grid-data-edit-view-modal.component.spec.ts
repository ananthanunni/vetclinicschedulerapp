import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDataEditViewModalComponent } from './grid-data-edit-view-modal.component';

describe('GridDataEditViewModalComponent', () => {
  let component: GridDataEditViewModalComponent;
  let fixture: ComponentFixture<GridDataEditViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDataEditViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDataEditViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
