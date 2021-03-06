import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteEditComponent } from './institute-edit.component';

describe('InstituteEditComponent', () => {
  let component: InstituteEditComponent;
  let fixture: ComponentFixture<InstituteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
