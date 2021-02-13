import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { training } from '../model/training';
import { AddExercisePage } from '../pages/add-exercise/add-exercise.page';
import { AddtrainingPage } from '../pages/addtraining/addtraining.page';
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
  @ViewChild('input', { static: false }) myInput: IonSearchbar;
  constructor(private api: ApiService,
    private modalController: ModalController,
    private authS: AuthService,
    private present: PresentService) { }

  async ionViewDidEnter() {
    await this.loadAll();
  }
  public async loadAll() {
    // await this.present.presentLoading;
    try {
      this.trainings = await this.api.getTrainingsbyUser(this.authS.getUser().id);
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

  async addexercise() {
    await this.openAddExercise();
    await this.loadAll();
  }
  async openAddTraining(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddtrainingPage,
      cssClass: 'my-custom-class',

    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  async openAddExercise(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddExercisePage,
      cssClass: 'my-custom-class',

    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  public async searchPlayer($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.api.searchByTitleFromUser(value,this.authS.getUser().id)
        .then(d => {
          this.trainings = d;
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
          // await this.ui.hideLoading();
          // this.myInput.setFocus();
        });
    } else {
      await this.loadAll();
    }
  }
  public async removeTraining(item: training) {
    //Eliminar de la tabla en medio
    await this.present.presentLoading;
    item.exercises.forEach(element => {
      this.api.removeListExercise(item.id,element).then(d=>{
        this.api.removeExercise(element).then(d=>{}).catch(err=>{});
      }).catch(err=>{});
    
    });
    this.api.removeTraining(item).then(async d => await this.loadAll())
      .catch(async err => await this.present.presentToast(err.error, "danger")
        .finally(async () => { await this.present.dismissLoad() }))
  }


}
