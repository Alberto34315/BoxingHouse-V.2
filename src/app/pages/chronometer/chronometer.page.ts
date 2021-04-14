import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Time } from 'src/app/model/time';
import { Timer } from 'src/app/model/timer';
import { training } from 'src/app/model/training';
import { TtsService } from 'src/app/services/tts.service';
const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.page.html',
  styleUrls: ['./chronometer.page.scss'],
})
export class ChronometerPage implements OnInit {
  @Input("timer") timer: Timer;
  @Input("trainingStart") trainingStart: training;
  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  t: number; //in seconds
  bt: number;
  round;
  tround: Time;
  btround: Time;
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
  public textSpeak;
  flag:boolean;
  state: 'stop' | 'resume' | 'finish' = 'finish';
  constructor(private modalController: ModalController,
    private speak: TtsService) { }

  ngOnInit() {
    this.flag=true;
    if (this.timer == undefined) {
      this.round = 1;
      if (this.trainingStart != undefined) {
        if (this.trainingStart.time < 60) {
          this.tround = {
            min: 0,
            s: 0
          }
          this.btround = {
            min: 0,
            s: this.trainingStart.time
          }
        } else {
          this.tround = {
            min: 0,
            s: 0
          }
          this.btround = {
            min: parseInt((this.trainingStart.time / 60).toFixed()),
            s: (this.trainingStart.time % 60)
          }
        }
      }
    } else {
      this.round = this.timer.round;
      this.tround = this.timer.tRounds;
      this.btround = this.timer.bTime;
    }
  }
  startTime(duration: number) {
    this.flag=true;
    this.state = 'resume';
    this.read("Comenzamos")
    if (this.countRound <= this.round) {
      clearInterval(this.interval);
      this.t = duration * ((this.tround.min * 60) + this.tround.s);
      this.bt = duration * ((this.btround.min * 60) + this.btround.s);
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
    this.totalTime = this.startDuration * ((this.tround.min * 60) + this.tround.s);
    const percentage = ((this.totalTime - this.t) / this.totalTime) * 100;
    this.percent.next(percentage);
    --this.t;
    if (this.t==-1) {
      this.read("Descanso")
    }
    if (this.t < -1) {
      this.breakTime();
    }
  }
  stopTimer() {
    clearInterval(this.interval);
    if (this.countRound > this.round) {
      this.countRound = 1;
      this.time.next('00:00');
      this.percent.next(100);
      this.state = 'finish';
    } else {
      this.time.next(this.text);
      this.state = 'stop';
    }

  }
  resume() {
    this.state = 'resume';
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
    this.flag=false;
    let m: any = this.bt / 60;
    let s: any = this.bt % 60;

    m = String('0' + Math.floor(m)).slice(-2);
    s = String('0' + Math.floor(s)).slice(-2);
    this.text = m + ':' + s;

    this.time.next(this.text);
    this.totalBTime = this.startDuration * ((this.btround.min * 60) + this.btround.s);
    const percentage = ((this.totalBTime - this.bt) / this.totalBTime) * 100;
    this.percent.next(percentage);
    --this.bt;
    if (this.bt < -1) {
      this.countRound++;
      this.startTime(this.startDuration);
    }
  }
  read(item?: any) {
    this.text = item
    this.speak.talk(this.text);
  }
  public exit() {
    this.modalController.dismiss();
  }
}


