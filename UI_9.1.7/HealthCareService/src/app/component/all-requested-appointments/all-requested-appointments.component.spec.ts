import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestedAppointmentsComponent } from './all-requested-appointments.component';

describe('AllRequestedAppointmentsComponent', () => {
  let component: AllRequestedAppointmentsComponent;
  let fixture: ComponentFixture<AllRequestedAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRequestedAppointmentsComponent]
    });
    fixture = TestBed.createComponent(AllRequestedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
