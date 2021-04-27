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
  exercises: exercise[];
  exercise: exercise;
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
    await this.loadAll();
  }
  public async loadAll() {
    if (this.training.id == undefined) {
      try {
        this.exercises = await this.api.getExercisesByUser(this.authS.getUser().id);
      } catch (err) {
        this.exercises = null;
        await this.present.presentToast("Error al cargar los entrenamientos", "danger");
      }
    } else {
      try {
        this.exercises = await this.api.getAllExercisesByIdUserAndNotFoundTraining(this.authS.getUser().id);
      } catch (err) {
        this.exercises = null;
        await this.present.presentToast("Error al cargar los entrenamientos", "danger");
      }
    }
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
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      if (this.training.id == undefined) {
        this.api.searchExerciseByTitle(value, this.authS.getUser().id)
          .then(d => {
            this.exercises = d;
          }).catch(async err => await this.present.presentToast(err.error, "danger"))
          .finally(async () => { });
      } else {
        this.api.searchAllExercisesByIdUserAndNotFoundTraining(this.authS.getUser().id, value)
          .then(d => {
            this.exercises = d;
          }).catch(async err => await this.present.presentToast(err.error, "danger"))
          .finally(async () => { });
      }
    } else {
      await this.loadAll();
    }
  }

  public exit() {
    this.modalController.dismiss();
  }
}
