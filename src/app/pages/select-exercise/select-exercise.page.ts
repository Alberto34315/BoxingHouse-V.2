import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-select-exercise',
  templateUrl: './select-exercise.page.html',
  styleUrls: ['./select-exercise.page.scss'],
})
export class SelectExercisePage implements OnInit {

  @Input("training") training: training;
  exercises: exercise[] = [];
  exercise: exercise;
  num: number = 0;
  search
  public task: FormGroup;
  constructor(private api: ApiService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private present: PresentService) {
    this.task = this.formBuilder.group({
      check: false
    })
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.refrescar()
  }
  public async loadAll($event = null) {
    if ($event) {
      $event.target.complete();
      this.num = 0
      this.exercises = []
    }
    if (this.training.id == undefined) {
      try {
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
    } else {
      try {
        this.present.presentLoading().then(async res => {
          this.exercises = this.exercises.concat(await this.api.getAllExercisesByIdUserAndNotFoundTraining(this.authS.getUser().id, this.num));
          if (this.exercises != null || this.exercises != undefined) {
            this.present.dismissLoad()
          }
        }).catch(err => { console.log(err) })
      } catch (err) {
        this.exercises = null;
        await this.present.presentToast("Error al cargar los entrenamientos", "danger");
      }
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
      if (this.search != undefined) {
        this.searchExercise(this.search)
      } else {
        this.loadAll()
      }
      $event.target.complete();
    }, 500);
  }

  public save() {
    this.exercises.forEach(element => {
      if (element.isChecked == false) {

        this.exercise = {
          id: element.id,
          nameExercise: element.nameExercise,
          description: element.description,
          creator: element.creator,
          type: element.type,
          repTime: element.repTime,
          photo: element.photo
        }
        this.training.exercises.push(this.exercise)
      }
    });
    this.modalController.dismiss();
  }

  public async searchExercise($event) {
    let value
    if ($event.detail != undefined) {
      value = $event.detail.value;
      this.exercises = []
      this.num = 0
    } else {
      value = $event
    }
    value = value.trim();
    this.search = value
    if (value != '') {
      if (this.training.id == undefined) {
        this.api.searchExerciseByTitle(value, this.authS.getUser().id, this.num)
          .then(d => {
            this.exercises = this.exercises.concat(d);
          }).catch(async err => await this.present.presentToast(err.error, "danger"))
          .finally(async () => { });
      } else {
        this.api.searchAllExercisesByIdUserAndNotFoundTraining(this.authS.getUser().id, value, this.num)
          .then(d => {
            this.exercises = this.exercises.concat(d);
          }).catch(async err => await this.present.presentToast(err.error, "danger"))
          .finally(async () => { });
      }
    } else {
      this.search = undefined
      this.refrescar()
    }
  }

  public exit() {
    this.modalController.dismiss();
  }
}
