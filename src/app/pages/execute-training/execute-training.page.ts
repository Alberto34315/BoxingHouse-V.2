import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { TimerService } from 'src/app/services/timer.service';
import { StartTrainingPage } from '../start-training/start-training.page';

@Component({
  selector: 'app-execute-training',
  templateUrl: './execute-training.page.html',
  styleUrls: ['./execute-training.page.scss'],
})

export class ExecuteTrainingPage implements OnInit {
  @Input("trainingExe") trainingExe: training;
  conditionType: boolean;
  button: boolean;
  m;
  s;
  me;
  se;
  text;
  text2;
  mbt;
  sbt;
  timeout;
  interval;
  bTime: BehaviorSubject<string> = new BehaviorSubject("00:00");
  timeExer: BehaviorSubject<string> = new BehaviorSubject("00:00");
  @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;
  
  constructor(private modalController: ModalController,
    private timerS: TimerService) { }

  ngOnInit() {
    this.slides.update();
    if (this.trainingExe.time < 60) {
      this.timerS.minBT = 0;
      this.timerS.sBT = this.trainingExe.time
    } else {
      this.timerS.minBT = parseInt((this.trainingExe.time / 60).toFixed());
      this.timerS.sBT = (this.trainingExe.time % 60)
    }
    if (this.trainingExe.exercises.length == 0) {
      this.button = true;
    } else {
      this.button = false;
    }
    this.loadBTime()
  }

  async openStartTraining(): Promise<any> {
    const modal = await this.modalController.create({
      component: StartTrainingPage,
      cssClass: 'my-custom-class',
      componentProps: {
        trainingStart: this.trainingExe
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  loadBTime(){
    this.mbt = String('0' + Math.floor(this.timerS.minBT)).slice(-2);
    this.sbt = String('0' + Math.floor(this.timerS.sBT)).slice(-2);
    this.text = this.mbt + ':' + this.sbt;
    this.bTime.next(this.text);
  }

  loadTimeExercise(item?:exercise):boolean{
    let flag:boolean=false;
    if (item.type=="Time") {
      flag=true
      if(item.repTime<60){
      this.m = 0;
      this.s = item.repTime
    } else {
      this.m = parseInt((item.repTime / 60).toFixed());
      this.s = (item.repTime % 60)
    }
    this.me = String('0' + Math.floor(this.m)).slice(-2);
    this.se = String('0' + Math.floor(this.s)).slice(-2);
    this.text2 = this.me + ':' + this.se;
    this.timeExer.next(this.text2);
  }else{
    flag=false
  }
    return flag
  }

  public exit() {
    this.modalController.dismiss();
  }
}
