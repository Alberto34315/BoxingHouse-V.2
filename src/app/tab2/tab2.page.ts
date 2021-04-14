import { Component } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Timer } from '../model/timer';
import { ChronometerPage } from '../pages/chronometer/chronometer.page';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  timer: Timer;
  round: number = 1;
  text;
  text2;
  m;
  s;
  mbt;
  sbt;
  timeout;
  interval;
  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  bTime: BehaviorSubject<string> = new BehaviorSubject("00:00");
  constructor(
    private modalController: ModalController,
    private timerS: TimerService) { }

  ionViewDidEnter() {
    this.reset()
  }

  addRoundPress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        if (this.round < 12) {
          this.round++;
        }
      }, 50);
    }, 300);
  }

  addRound() {
    if (this.round < 12) {
      this.round++;
    }
  }

  removeRoundPress() {
    //this.timerS.min
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        if (this.round > 1) {
          this.round--;
        }
      }, 50);
    }, 300);
  }

  removeRound() {
    //this.timerS.min
    if (this.round > 1) {
      this.round--;
    }
  }

  addTRoundsPress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.addTRounds();
        this.loadTime();
      }, 50);
    }, 300);
  }
  addTRounds() {
    this.timerS.addTRounds();
    this.loadTime();
  }

  removeTRoundsPress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.removeTRounds();
        this.loadTime();
      }, 50);
    }, 300);
  }
  removeTRounds() {
    this.timerS.removeTRounds();
    this.loadTime();
  }

  addBTimePress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.addBTime();
        this.loadBTime();
      }, 50);
    }, 300);
  }

  addBTime() {
    this.timerS.addBTime();
    this.loadBTime();
  }

  removeBTimePress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.removeBTime();
        this.loadBTime();
      }, 50);
    }, 300);
  }

  removeBTime() {
    this.timerS.removeBTime();
    this.loadBTime();
  }

  loadTime() {
    this.m = String('0' + Math.floor(this.timerS.min)).slice(-2);
    this.s = String('0' + Math.floor(this.timerS.s)).slice(-2);
    this.text = this.m + ':' + this.s;
    this.time.next(this.text);
  }

  loadBTime() {
    this.mbt = String('0' + Math.floor(this.timerS.minBT)).slice(-2);
    this.sbt = String('0' + Math.floor(this.timerS.sBT)).slice(-2);
    this.text2 = this.mbt + ':' + this.sbt;
    this.bTime.next(this.text2);
  }
  async openChronometer() {

    this.timer = {
      round: this.round,
      tRounds: {
        min: this.timerS.min,
        s: this.timerS.s
      },
      bTime: {
        min: this.timerS.minBT,
        s: this.timerS.sBT
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
  clearPress() { //Cuando se termine de pulsar
    clearTimeout(this.timeout); //Limpiamos el timeout
    clearInterval(this.interval); //Limpiamos el intervalo
  };

  reset() {
    this.round = 1;
    this.timerS.min = 0;
    this.timerS.s = 5;
    this.timerS.minBT = 0;
    this.timerS.sBT = 5;
    this.loadTime();
    this.loadBTime();
  }
}
