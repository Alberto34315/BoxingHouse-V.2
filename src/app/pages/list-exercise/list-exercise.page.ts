import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { TtsService } from 'src/app/services/tts.service';
import { AddExercisePage } from '../add-exercise/add-exercise.page';
@Component({
  selector: 'app-list-exercise',
  templateUrl: './list-exercise.page.html',
  styleUrls: ['./list-exercise.page.scss'],
})
export class ListExercisePage implements OnInit {
  @ViewChild('input', { static: false }) myInput: IonSearchbar;
  exercises: exercise[];
  constructor(private api: ApiService,
    private modalController: ModalController,
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
      this.exercises = await this.api.getExercisesByUser(this.authS.getUser().id);
      //    this.present.dismissLoad();
      if ($event) {
        $event.target.complete();
      }
    } catch (err) {
      this.exercises = null; //vista
      //      this.present.dismissLoad();
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
  async editExercise(e: exercise) {
    await this.openAddExercise(e);
    await this.loadAll();
  }
  public async searchExercise($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.api.searchExerciseByTitle(value, this.authS.getUser().id)
        .then(d => {
          this.exercises = d;
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
  async openAddExercise(e?: any): Promise<any> {

    const modal = await this.modalController.create({
      component: AddExercisePage,
      cssClass: 'my-custom-class',
      componentProps: {
        exerciseEdit: e
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  public async removeExercises(item: exercise) {
    await this.present.presentLoading;
    if (item.t != undefined) {
      await item.t.forEach(element => {
        this.api.deleteFromListExercise(element, item).then(d => { }).catch(err => { });
      });
    }
    setTimeout(() => {
      this.api.removeExercise(item).then(async d => {
        await this.loadAll()
      }).catch(async err => {
        console.log(err)
      })
    }, 400);
  }
}
