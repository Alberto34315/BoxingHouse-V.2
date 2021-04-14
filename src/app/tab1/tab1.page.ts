import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { records } from '../model/records';
import { training } from '../model/training';
import { AddExercisePage } from '../pages/add-exercise/add-exercise.page';
import { AddtrainingPage } from '../pages/addtraining/addtraining.page';
import { ExecuteTrainingPage } from '../pages/execute-training/execute-training.page';
import { ListExercisePage } from '../pages/list-exercise/list-exercise.page';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { PresentService } from '../services/present.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  trainings: training[]
  text;
  m;
  s;
  mbt;
  sbt;
  timeout;
  interval;
  bTime: BehaviorSubject<string> = new BehaviorSubject("00:00");
  @ViewChild('input', { static: false }) myInput: IonSearchbar;
  constructor(private api: ApiService,
    private authS: AuthService,
    private modalController: ModalController,
    private present: PresentService) { }

  async ionViewDidEnter() {
    await this.loadAll();
  }
  public async loadAll($event = null) {
    // await this.present.presentLoading;
    try {
      this.trainings = await this.api.getTrainingsByUser(this.authS.getUser().id);
      if ($event) {
        $event.target.complete();
      }
      //    this.present.dismissLoad();
    } catch (err) {
      this.trainings = null; //vista
      //      this.present.dismissLoad();
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  async addtraining() {
    await this.openAddTraining();
    await this.loadAll();
  }
  async editraining(t: training) {
    await this.openAddTraining(t);
    await this.loadAll();
  }

  async openAddTraining(t?: any): Promise<any> {
    if (t == undefined) {
      t = {
        title: "",
        creator: this.authS.getUser(),
        time: 0,
        exercises: []
      }
    }

    const modal = await this.modalController.create({
      component: AddtrainingPage,
      cssClass: 'my-custom-class',
      componentProps: {
        trainingEdit: t
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  async addexercise() {
    await this.openAddExercise();
    await this.loadAll();
  }
  async openAddExercise(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddExercisePage,
      cssClass: 'my-custom-class',

    });

    await modal.present();
    return await modal.onWillDismiss();
  }
  async openExecuteTraining(t?: any): Promise<any> {

    const modal = await this.modalController.create({
      component: ExecuteTrainingPage,
      cssClass: 'my-custom-class',
      componentProps: {
        trainingExe: t
      }
    });

    await modal.present();
    return await modal.onWillDismiss();
  }
  async listexercise() {
    await this.openListExercise();
    await this.loadAll();
  }
  async openListExercise(): Promise<any> {
    const modal = await this.modalController.create({
      component: ListExercisePage,
      cssClass: 'my-custom-class',

    });

    await modal.present();
    return await modal.onWillDismiss();
  }

  public async searchTraining($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      this.api.searchByTitle(value, this.authS.getUser().id)
        .then(d => {
          this.trainings = d;
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
          
        });
    } else {
      await this.loadAll();
    }
  }
  public async removeTraining(item: training) {
    await this.present.presentLoading;
    if (item.exercises != undefined) {
      await item.exercises.forEach(element => {
        this.api.deleteFromListExercise(item, element).then(d => { }).catch(err => { });
      });
    }
    setTimeout(() => {
      this.api.removeTraining(item).then(async d => await this.loadAll())
        .catch(async err => {
          console.log(err)
        })
    }, 500);
  }

  loadBTime(item?:training):boolean {
    let flag:boolean=true;
    if (item.time < 60) {
      this.m = 0;
      this.s = item.time
    } else {
      this.m = parseInt((item.time / 60).toFixed());
      this.s = (item.time % 60)
    }
    this.mbt = String('0' + Math.floor(this.m)).slice(-2);
    this.sbt = String('0' + Math.floor(this.s)).slice(-2);
    this.text = this.mbt + ':' + this.sbt;
    this.bTime.next(this.text);
    return flag
  }

}
