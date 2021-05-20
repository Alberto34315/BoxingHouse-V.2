import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { search } from 'tstl/ranges/algorithm';
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
  trainings: training[] = []
  text;
  m;
  s;
  mbt;
  sbt;
  timeout;
  interval;
  num: number = 0;
  search
  bTime: BehaviorSubject<string> = new BehaviorSubject("00:00");
  @ViewChild('input', { static: false }) myInput: IonSearchbar;
  constructor(private api: ApiService,
    private authS: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private present: PresentService) { }

  async ionViewDidEnter() {
    await this.refrescar()
  }
  public async loadAll($event = null) {
    try {
      if ($event) {
        $event.target.complete();
        this.num = 0
        this.trainings = []
      }
      this.present.presentLoading().then(async res => {
        this.trainings = this.trainings.concat(await this.api.getTrainingsByUser(this.authS.getUser().id, this.num));
        if (this.trainings != null || this.trainings != undefined) {
          this.present.dismissLoad()
        }
      }).catch(err => { console.log(err) })

    } catch (err) {
      this.trainings = null;
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }

  loadMore($event = null) {
    setTimeout(() => {
      this.num += 10
        if(this.search!=undefined){
          this.searchTraining(this.search)
        }else{
          this.loadAll()
        }
      $event.target.complete();
    }, 500);
  }

  refrescar() {
      this.num = 0
      this.trainings = []
      this.loadAll();
  }

  async addtraining() {
    await this.openAddTraining();
    await this.refrescar();
  }

  async editraining(t: training) {
    await this.openAddTraining(t);
    await this.refrescar();
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
    await this.refrescar();
  }

  async openAddExercise(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddExercisePage,
      cssClass: 'my-custom-class',

    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  async openExecuteTraining(t?: training): Promise<any> {
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
    await this.refrescar();
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
    let value
    if($event.detail!=undefined){
       value = $event.detail.value;
      this.trainings=[]
      this.num=0
    }else{
      value=$event
    }
    value = value.trim();
    this.search=value
    if (value != '') {
      this.api.searchByTitle(value, this.authS.getUser().id, this.num)
        .then(d => {
          this.trainings = this.trainings.concat(d);
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {

        });
    } else {
      this.search=undefined
      this.refrescar()
    }
  }

  async removetAlert(item: training) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de querer borrar el entrenamiento?',
      message: 'El entrenamiento se borrará del historial de todos los usuarios que hayan realizado este entrenamiento',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.removeTraining(item);
          alert.dismiss()
        }
      }]


    });
    await alert.present();
  }


  public async removeTraining(item: training) {
    await this.present.presentLoading;
    if (item.exercises != undefined) {
      await item.exercises.forEach(element => {
        this.api.deleteFromListExercise(item, element).then(d => { }).catch(err => { });
      });
    }
    setTimeout(() => {
      this.api.removeTrainingFromRecord(item).then(async d => { })
        .catch(async err => {
          console.log(err)
        })
      this.api.deleteAllTrainingsFavorite(item).then(async d => { })
        .catch(async err => {
          console.log(err)
        })
      this.api.removeTraining(item).then(async d => await this.refrescar())
        .catch(async err => {
          console.log(err)
        })
    }, 200);
  }

  loadBTime(item?: training): boolean {
    let flag: boolean = true;
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
