import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetLookupComponent } from './pet-lookup.component';

describe('PetLookupComponent', () => {
  let component: PetLookupComponent;
  let fixture: ComponentFixture<PetLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
