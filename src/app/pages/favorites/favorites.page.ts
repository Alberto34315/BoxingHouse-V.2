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
  trainings: training[] = []
  num: number = 0;
  search
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
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
        this.trainings = this.trainings.concat(await this.api.getAllTrainingsFromFavorites(this.authS.getUser().id, this.num));
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
        this.searchFavorite(this.search)
      }else{
        this.loadAll()
      }
      $event.target.complete();
    }, 500);
  }

  async executeTraining(t?: any) {
    await this.openExecuteTraining(t);
    await this.refrescar();
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

  refrescar() {
    this.num = 0
    this.trainings = []
    this.loadAll();
}

  public async searchFavorite($event) {
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
      this.api.searchTrainingsFromFavorites(this.authS.getUser().id, value, this.num)
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

  public exit() {
    this.modalController.dismiss();
  }
}
