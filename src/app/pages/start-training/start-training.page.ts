import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { training } from 'src/app/model/training';
import { TimerService } from 'src/app/services/timer.service';
import { ChronometerPage } from '../chronometer/chronometer.page';

@Component({
  selector: 'app-start-training',
  templateUrl: './start-training.page.html',
  styleUrls: ['./start-training.page.scss'],
})
export class StartTrainingPage implements OnInit {
  @Input("trainingStart") trainingStart: training;
  countRound = 1;
  i = 0;
  interval;
  t;
  state: 'stop' | 'start' = 'stop';
  constructor(private modalController: ModalController,
    private timerS: TimerService) { }

  ngOnInit() {
    if (this.trainingStart.time < 60) {
      this.timerS.minBT = 0;
      this.timerS.sBT = this.trainingStart.time
    } else {
      this.timerS.minBT = parseInt((this.trainingStart.time / 60).toFixed());
      this.timerS.sBT = (this.trainingStart.time % 60)
    }
    this.t = this.trainingStart.exercises[this.i].repTime
  }
  async openChrono(): Promise<any> {
    const modal = await this.modalController.create({
      component: ChronometerPage,
      cssClass: 'my-custom-class',
      componentProps: {
        trainingStart: this.trainingStart
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  async next() {
    if (this.countRound < this.trainingStart.exercises.length) {
      await this.openChrono();
      this.countRound++;
      this.i++;
      this.t = this.trainingStart.exercises[this.i].repTime
      clearInterval(this.interval);
    }
  }
  back() {
    if (this.countRound > 1) {
      this.countRound--;
      this.i--;
      this.t = this.trainingStart.exercises[this.i].repTime
      clearInterval(this.interval);
    }
  }
  playTime() {
    this.state = 'start';
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.t > 0 && this.trainingStart.exercises[this.i].type == 'Time') {
        this.t--;
      }
    }, 1000);
  }

  stopTime() {
    this.state = 'stop';
    clearInterval(this.interval);
    this.t = this.trainingStart.exercises[this.i].repTime
  }
  public exit() {
    this.modalController.dismiss();
  }
}
