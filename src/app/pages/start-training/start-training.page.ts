import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { exercise } from 'src/app/model/exercise';
import { records } from 'src/app/model/records';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimerService } from 'src/app/services/timer.service';
import { TtsService } from 'src/app/services/tts.service';
import { ChronometerPage } from '../chronometer/chronometer.page';

@Component({
  selector: 'app-start-training',
  templateUrl: './start-training.page.html',
  styleUrls: ['./start-training.page.scss'],
})
export class StartTrainingPage implements OnInit {
  @Input("trainingStart") trainingStart: training;
  countRound = 1;
  record:records;
  i = 0;
  interval;
  t;
  public text;
  num;
  textTime;
  m;
  s;
  tm;
  ts;
  timeExer: BehaviorSubject<string> = new BehaviorSubject("00:00");
  state: 'stop' | 'start' = 'stop';
  constructor(private modalController: ModalController,
    private timerS: TimerService,
    private api: ApiService,
    private speak: TtsService,
    private authS: AuthService) { }

  ngOnInit() {
    if (this.trainingStart.time < 60) {
      this.timerS.minBT = 0;
      this.timerS.sBT = this.trainingStart.time
    } else {
      this.timerS.minBT = parseInt((this.trainingStart.time / 60).toFixed());
      this.timerS.sBT = (this.trainingStart.time % 60)
    }
    this.t = this.trainingStart.exercises[this.i].repTime
    this.read(this.trainingStart.exercises[this.i])
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
      this.read(this.trainingStart.exercises[this.i])
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
      if (this.trainingStart.exercises[this.i].repTime > 0 && this.trainingStart.exercises[this.i].type == 'Time') {
        this.trainingStart.exercises[this.i].repTime--;
        this.loadTimeExercise(this.trainingStart.exercises[this.i])
      }
    }, 1000);
  }

  stopTime() {
    this.state = 'stop';
    clearInterval(this.interval);
    this.trainingStart.exercises[this.i].repTime=this.t
  }

  public exit() {
    this.stopTime();
    this.modalController.dismiss();
  }

  
  finishTraining() {
    let d = new Date();
    this.record= {
      idTrai: {id:this.trainingStart.id},
      idu:{id:this.authS.getUser().id},
      localDateTime: d
    }
    this.api.createRecord(this.record).then(result => {
      this.exit();
    }).catch(err => {
      console.log(err.error)
    });
  }
  
  loadTimeExercise(i?:exercise): boolean {
    let flag: boolean = false;
    if (i.type == "Time") {
      flag = true
      if (i.repTime < 60) {
        this.timerS.min = 0;
        this.timerS.s = i.repTime
      } else {
        this.timerS.min = parseInt((i.repTime / 60).toFixed());
        this.timerS.s = (i.repTime % 60)
      }
      this.tm = String('0' + Math.floor(this.timerS.min)).slice(-2);
      this.ts = String('0' + Math.floor(this.timerS.s)).slice(-2);
      this.textTime = this.tm + ':' + this.ts;
      this.timeExer.next(this.textTime);
    } else {
      this.num=i.repTime
      flag = false
    }
    return flag
  }
  read(item?: any) {
    this.text = item.description
    this.speak.talk(this.text);
  }
}
