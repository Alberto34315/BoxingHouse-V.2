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
  bt: number;
  text;
  totalTime;
  totalBTime;
  interval;
  tresume;
  btresume;
  startDuration = 1;
  circleR = circleR;
  circleDasharray = circleDasharray;
  countRound = 1;
  state:  'stop' | 'resume' | 'finish' = 'finish';
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.timer);  
  }
  startTime(duration: number) {
    this.state = 'resume';
    if (this.countRound <= this.timer.round) {
      clearInterval(this.interval);
       this.t = duration * ((this.timer.tRounds.min * 60) + this.timer.tRounds.s);
    this.bt = duration * ((this.timer.bTime.min * 60) + this.timer.bTime.s);
      this.updateTimeValue();
      this.interval = setInterval(() => {
        this.updateTimeValue();
      }, 1000);

    } else {
      this.stopTimer();
      
  //  this.modalController.dismiss();
    }

  }
  /*  swapDuration() {
      this.startDuration = this.startDuration === 1 ? 0.5 : 1;
    }*/
  updateTimeValue() {
    let m: any = this.t / 60;
    let s: any = this.t % 60;

    m = String('0' + Math.floor(m)).slice(-2);
    s = String('0' + Math.floor(s)).slice(-2);
    this.text = m + ':' + s;
    this.time.next(this.text);
    this.totalTime = this.startDuration * ((this.timer.tRounds.min * 60) + this.timer.tRounds.s);
    const percentage = ((this.totalTime - this.t) / this.totalTime) * 100;
    this.percent.next(percentage);
    --this.t;
    if (this.t < -1) {
      this.breakTime();
    }
  }
  stopTimer() {
    clearInterval(this.interval);
    if (this.countRound > this.timer.round) {
      this.countRound = 1;
      this.time.next('00:00');
      this.percent.next(100);
      this.state = 'finish';
    }else{
      this.time.next(this.text);
      this.state = 'stop';
    }
    
  }
  resume(){
    this.state='resume';
    clearInterval(this.interval);
      this.updateTimeValue();
      this.interval = setInterval(() => {
        this.updateTimeValue();
      }, 1000);
  }
  
  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

  breakTime() {
    let m: any = this.bt / 60;
    let s: any = this.bt % 60;

    m = String('0' + Math.floor(m)).slice(-2);
    s = String('0' + Math.floor(s)).slice(-2);
    this.text = m + ':' + s;

    this.time.next(this.text);
    this.totalBTime = this.startDuration * ((this.timer.bTime.min * 60) + this.timer.bTime.s);
    const percentage = ((this.totalBTime - this.bt) / this.totalBTime) * 100;
    this.percent.next(percentage);
    --this.bt;
    if (this.bt < -1) {
      this.countRound++;
      this.startTime(this.startDuration);
    }
  }

  public exit() {
    this.modalController.dismiss();
  }
}


