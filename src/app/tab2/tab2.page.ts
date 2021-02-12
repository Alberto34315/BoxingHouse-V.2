import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Timer } from '../model/timer';
import { ChronometerPage } from '../pages/chronometer/chronometer.page';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  timer:Timer;
  round:number = 1;
  
  constructor(
    private modalController: ModalController,
    private timerS:TimerService) { }

  addRound() {
    if (this.round < 12) {
      this.round++;
    }
  }
  removeRound() {
    this.timerS.min
    if (this.round > 1) {
      this.round--;
    }
  }
  addTRounds(){
    this.timerS.addTRounds();
  }
  removeTRounds(){
    this.timerS.removeTRounds();
  }

  addBTime(){
    this.timerS.addBTime();
  }
  removeBTime(){
    this.timerS.removeBTime();
  }
  
  async openChronometer() {
    
    this.timer={
     round:this.round,
     tRounds:{
      min:this.timerS.min,
      s:this.timerS.s
     },
     bTime:{
      min:this.timerS.minBT,
      s:this.timerS.sBT
     }
    }
    
    const modal = await this.modalController.create({
      component: ChronometerPage,
      cssClass: 'my-custom-class',
      componentProps: {
        timer: this.timer
      }
    });

    return await modal.present();
  }

  reset(){
    this.round = 1;
    this.timerS.min=0;
    this.timerS.s=5;
    this.timerS.minBT=0;
    this.timerS.sBT=5;
  }
}
