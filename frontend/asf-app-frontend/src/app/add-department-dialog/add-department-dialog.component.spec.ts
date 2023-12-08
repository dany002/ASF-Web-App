import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentDialogComponent } from './add-department-dialog.component';

describe('AddDepartmentDialogComponent', () => {
  let component: AddDepartmentDialogComponent;
  let fixture: ComponentFixture<AddDepartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
