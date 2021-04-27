import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { ExecuteTrainingPage } from '../execute-training/execute-training.page';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  trainings: training[]
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.loadAll();
  }
  public async loadAll($event = null) {
    // await this.present.presentLoading;
    try {
      this.trainings = await this.api.getAllTrainingsFromFavorites(this.authS.getUser().id);

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

  async executeTraining(t?: any) {
    await this.openExecuteTraining(t);
    await this.loadAll();
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

  public async searchFavorite($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      this.api.searchTrainingsFromFavorites(this.authS.getUser().id, value)
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

  public exit() {
    this.modalController.dismiss();
  }
}
