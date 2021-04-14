import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  min: number = 0;
  s: number = 5;
  minBT: number = 0;
  sBT: number = 5;
  constructor() { }
  /**
   * Añade tiempo de la ronda
   */
  addTRounds() {
    this.s++;
    if (this.s > 59) {
      this.s = 0;
      this.min++;
    }
  }
  /**
   * Elimina tiempo de la ronda
   */
  removeTRounds() {
    if (this.min == 0 && this.s == 5) {
      this.s = 5;
    } else if (this.s >= this.min) {
      this.s--;
    } else if (this.min > 0) {
      this.min--;
      this.s = 59;
    }
  }

  /**
   * Elimina tiempo o la repeticiones de un ejericio
   */
  removeT() {
    if (this.min == 0 && this.s == 1) {
      this.s = 1;
    } else if (this.s >= this.min) {
      this.s--;
    } else if (this.min > 0) {
      this.min--;
      this.s = 59;
    }
  }
  /**
   * Añade tiempo de descanso
   */
  addBTime() {
    this.sBT++;
    if (this.sBT > 59) {
      this.sBT = 0;
      this.minBT++;
    }
  }
  /**
   * Elimina Tiempo de descanso
   */
  removeBTime() {
    if (this.minBT == 0 && this.sBT == 5) {
      this.sBT = 5;
    } else if (this.sBT >= this.minBT) {
      this.sBT--;
    } else if (this.minBT > 0) {
      this.minBT--;
      this.sBT = 59;
    }
  }
}
