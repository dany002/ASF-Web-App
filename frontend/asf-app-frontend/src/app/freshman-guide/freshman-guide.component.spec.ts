import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshmanGuideComponent } from './freshman-guide.component';

describe('FreshmanGuideComponent', () => {
  let component: FreshmanGuideComponent;
  let fixture: ComponentFixture<FreshmanGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreshmanGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreshmanGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
