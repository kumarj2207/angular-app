import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { HttpClientDietService } from '../services/http-client-diet.service';

import { NewregistrationComponent } from './newregistration.component';

describe('NewregistrationComponent', () => {
  let component: NewregistrationComponent;
  let fixture: ComponentFixture<NewregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewregistrationComponent ],
      providers: [ AuthService, HttpClientDietService  ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
