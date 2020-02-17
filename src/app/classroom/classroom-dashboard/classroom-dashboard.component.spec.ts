import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDashboardComponent } from './classroom-dashboard.component';

describe('ClassroomDashboardComponent', () => {
  let component: ClassroomDashboardComponent;
  let fixture: ComponentFixture<ClassroomDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
