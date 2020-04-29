import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private abilityName = new Subject<string>();
  constructor() {}

  getAbilityName() {
    return this.abilityName.asObservable();
  }
  changeAbilityName(name: string) {
    this.abilityName.next(name);
  }
}
