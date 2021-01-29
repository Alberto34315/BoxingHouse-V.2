import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Timer } from 'src/app/model/timer';
const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;
@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.page.html',
  styleUrls: ['./chronometer.page.scss'],
})
export class ChronometerPage implements OnInit {
  @Input("timer") timer: Timer;
  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  t: number; //in seconds
  interval;
  startDuration = 1;
  circleR = circleR;
  circleDasharray = circleDasharray;
  state: 'start' | 'stop' = 'stop';
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.timer);
  }
  startTime(duration: number) {
    this.state = 'start';
    clearInterval(this.interval);
    this.t = duration * 5;
    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }
/*  swapDuration() {
    this.startDuration = this.startDuration === 1 ? 0.5 : 1;
  }*/
  updateTimeValue() {
    let m: any = this.t / 60;
    let s: any = this.t % 60;

    m = String('0' + Math.floor(m)).slice(-2);
    s = String('0' + Math.floor(s)).slice(-2);
    const text = m + ':' + s;
    this.time.next(text);
    const totalTime = this.startDuration * 5;
    const percentage = ((totalTime - this.t) / totalTime) * 100;
    this.percent.next(percentage);
    --this.t;
    if (this.t < -1) {
      this.startTime(this.startDuration);
    }
  }
  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
  }
  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }
  public exit() {
    this.modalController.dismiss();
  }
}
