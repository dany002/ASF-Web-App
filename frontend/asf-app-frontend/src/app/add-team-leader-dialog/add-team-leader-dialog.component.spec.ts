import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamLeaderDialogComponent } from './add-team-leader-dialog.component';

describe('AddTeamLeaderDialogComponent', () => {
  let component: AddTeamLeaderDialogComponent;
  let fixture: ComponentFixture<AddTeamLeaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamLeaderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamLeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
