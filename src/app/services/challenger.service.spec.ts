import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ChallengerService } from './challenger.service';
import { AuthService } from './auth.service';

describe('ChallengerService', () => {
  let service: ChallengerService;
  let httpClient: HttpClient;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule ], providers: [
      AuthService
  ]});
    service = TestBed.inject(ChallengerService);
    
    httpClient = TestBed.get(HttpClient);
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
