import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { ChallengerService } from '../services/challenger.service';

import { ViewMeasurementComponent } from './view-measurement.component';

describe('ViewMeasurementComponent', () => {
  let component: ViewMeasurementComponent;
  let fixture: ComponentFixture<ViewMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeasurementComponent ],
      providers: [ ChallengerService, AuthService ],
      imports: [ HttpClientTestingModule  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
