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
  exercises: exercise[]=[];
  num: number = 0;
  search
  constructor(private api: ApiService,
    private modalController: ModalController,
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
        this.exercises = []
      }
      this.present.presentLoading().then(async res => {
      this.exercises = this.exercises.concat(await this.api.getExercisesByUser(this.authS.getUser().id, this.num));
      if (this.exercises != null || this.exercises != undefined) {
        this.present.dismissLoad()
      }
    }).catch(err => { console.log(err) })
    } catch (err) {
      this.exercises = null; 
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
  async editExercise(e: exercise) {
    await this.openAddExercise(e);
    await this.refrescar();
  }
  public async searchExercise($event) {
    let value
    if($event.detail!=undefined){
       value = $event.detail.value;
      this.exercises=[]
      this.num=0
    }else{
      value=$event
    }
    value = value.trim();
    this.search=value
    if (value != '') {
      this.api.searchExerciseByTitle(value, this.authS.getUser().id, this.num)
        .then(d => {
          this.exercises =this.exercises.concat(d);
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
        });
    } else {
      this.search=undefined
      this.refrescar()
    }
  }
  
  refrescar() {
    this.num = 0
    this.exercises = []
    this.loadAll();
}

loadMore($event = null) {
  setTimeout(() => {
    this.num += 10
    if(this.search!=undefined){
      this.searchExercise(this.search)
    }else{
      this.loadAll()
    }
    $event.target.complete();
  }, 500);
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
        await this.refrescar()
      }).catch(async err => {
        console.log(err)
      })
    }, 400);
  }
}
