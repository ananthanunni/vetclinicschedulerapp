import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditorComponent } from './owner-editor.component';

describe('OwnerEditorComponent', () => {
  let component: OwnerEditorComponent;
  let fixture: ComponentFixture<OwnerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
