import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamLeaderDialogComponent } from './edit-team-leader-dialog.component';

describe('EditTeamLeaderDialogComponent', () => {
  let component: EditTeamLeaderDialogComponent;
  let fixture: ComponentFixture<EditTeamLeaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamLeaderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamLeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
