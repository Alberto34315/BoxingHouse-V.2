import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { exercise } from 'src/app/model/exercise';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-list-exercise',
  templateUrl: './list-exercise.page.html',
  styleUrls: ['./list-exercise.page.scss'],
})
export class ListExercisePage implements OnInit {
  @ViewChild('input', { static: false }) myInput: IonSearchbar;
  exercises: exercise[]
  constructor(private api: ApiService,
    private modalController: ModalController,
    private authS:AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.loadAll();
  }
  public async loadAll() {
    // await this.present.presentLoading;
    try {
      this.exercises = await this.api.getExercisesByUser(this.authS.getUser().id);
      //    this.present.dismissLoad();
    } catch (err) {
      this.exercises = null; //vista
      //      this.present.dismissLoad();
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
  public async removeExercises(item: exercise) {
    //Eliminar de la tabla en medio
    await this.present.presentLoading;
    this.api.removeExercise(item).then(async d => await this.loadAll())
    .catch(async err => await this.present.presentToast(err.error, "danger")
      .finally(async () => { await this.present.dismissLoad() }))
   
  }
}
