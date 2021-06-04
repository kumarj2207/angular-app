import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private dietMessageSource = new Subject<string>();
  dietMessage$ = this.dietMessageSource.asObservable();

  constructor() { }

  sendMessage(message: string) {
    this.dietMessageSource.next(message);
  }


}
