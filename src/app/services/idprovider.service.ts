import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdproviderService {
id : number = 3;
  constructor() { }

  getempId() : number {
    this.id = this.id + 1;
    return this.id;
  }
}
