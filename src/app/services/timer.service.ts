import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  min:number=0;
  s:number=5;
  minBT:number=0;
  sBT:number=5;
  constructor() { }

  addTRounds(){
    this.s++;
    if(this.s>59){
      this.s=0;
      this.min++;
    }
  }
  removeTRounds(){
    if(this.min==0 && this.s==5){
      this.s=5;
    }else if(this.s>=this.min){
      this.s--;
    }else if(this.min>0){
      this.min--;
      this.s=59;
    }
  }

  addBTime(){
    this.sBT++;
    if(this.sBT>59){
      this.sBT=0;
      this.minBT++;
    }
  }
  removeBTime(){
    if(this.minBT==0 && this.sBT==5){
      this.sBT=5;
    }else if(this.sBT>=this.minBT){
      this.sBT--;
    }else if(this.minBT>0){
      this.minBT--;
      this.sBT=59;
    }
  }
}
