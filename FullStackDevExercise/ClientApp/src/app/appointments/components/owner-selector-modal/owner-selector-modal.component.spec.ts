import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSelectorModalComponent } from './owner-selector-modal.component';

describe('OwnerSelectorModalComponent', () => {
  let component: OwnerSelectorModalComponent;
  let fixture: ComponentFixture<OwnerSelectorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerSelectorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
