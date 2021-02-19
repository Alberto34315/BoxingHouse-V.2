import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  conditionType:boolean;
  constructor(private modalController: ModalController,
    private timerS: TimerService) { }

  ngOnInit() {
    if (this.trainingExe.time < 60) {
      this.timerS.minBT = 0;
      this.timerS.sBT = this.trainingExe.time
    } else {
      this.timerS.minBT = parseInt((this.trainingExe.time / 60).toFixed());
      this.timerS.sBT = (this.trainingExe.time % 60)
    }
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
  public exit() {
    this.modalController.dismiss();
  }
}
