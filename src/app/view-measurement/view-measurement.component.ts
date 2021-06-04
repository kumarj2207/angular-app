import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../model/role.enum';
import { AuthService } from '../services/auth.service';
import { ChallengerService } from '../services/challenger.service';

@Component({
  selector: 'app-view-measurement',
  templateUrl: './view-measurement.component.html',
  styleUrls: ['./view-measurement.component.css']
})
export class ViewMeasurementComponent implements OnInit {

  displayedColumns: string[] = ['date', 'bmi', 'biceps', 'chest', 'forearms', 'height', 'legs', 'shoulders', 'thighs', 'waist', 'weight', 'action'];
  @Input() measurements: any;

  constructor(private challengerService: ChallengerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getRole() == Role.CHALLENGER){
      this.getMeasurements();
    }
  }

  getMeasurements() {
    let req = this.challengerService.getMeasurement();
    req.subscribe(
      success => { this.measurements = success},
      error => {console.error(error)}
    );
  }

}
