import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { TimerService } from 'src/app/services/timer.service';
import { SelectExercisePage } from '../select-exercise/select-exercise.page';

@Component({
  selector: 'app-addtraining',
  templateUrl: './addtraining.page.html',
  styleUrls: ['./addtraining.page.scss'],
})
export class AddtrainingPage implements OnInit {

  @Input("trainingEdit") trainingEdit: training;
  training: training
  public task: FormGroup;

  exercise: exercise;
  exercises: exercise[] = [];
  constructor(private modalController: ModalController,
    private authS: AuthService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private present: PresentService,
    private timerS: TimerService) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }

  ngOnInit() {
    if (this.trainingEdit.id != undefined) {
      this.training = {
        id: this.trainingEdit.id,
        title: this.trainingEdit.title,
        creator: this.authS.getUser(),
        time: this.trainingEdit.time,
        exercises: this.trainingEdit.exercises
      }
      this.task = this.formBuilder.group({
        title: [this.trainingEdit.title, Validators.required]
      })
      console.log(this.trainingEdit.time)
      if (this.trainingEdit.time < 60) {
        this.timerS.minBT = 0;
        this.timerS.sBT = this.trainingEdit.time
      } else {
        this.timerS.minBT = parseInt((this.trainingEdit.time / 60).toFixed());
        this.timerS.sBT = (this.trainingEdit.time % 60)
      }
    } else {
      this.training = {
        title: "",
        creator: this.authS.getUser(),
        time: 0,
        exercises: []
      }
    }
  }

  addBTime() {
    this.timerS.addBTime();
  }

  removeBTime() {
    this.timerS.removeBTime();
  }

  removeExercise(exer: exercise) {
    if (this.training.exercises.length > 0) {
      let e = this.training.exercises.indexOf(exer)
      this.training.exercises.splice(e, 1)
    }
  }

  public async selectE() {
    await this.selecExercise().then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }
  
  async selecExercise(): Promise<any> {
    /* this.training = {
       title: this.task.get('title').value,
       time: (this.timerS.minBT * 60) + this.timerS.sBT,
       exercises: this.exercises,
       creator: this.authS.getUser()
     }*/
    const modal = await this.modalController.create({
      component: SelectExercisePage,
      cssClass: 'my-custom-class',
      componentProps: {
        training: this.training
      }

    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  reset() {
    this.timerS.minBT = 0;
    this.timerS.sBT = 5;
  }

  /*Arreglar Update */
  public async save() {
    await this.present.presentLoading();

    if (this.trainingEdit.id != undefined) {

      this.training = {
        id: this.trainingEdit.id,
        title: this.task.get('title').value,
        time: (this.timerS.minBT * 60) + this.timerS.sBT,
        exercises: this.training.exercises,
        creator: this.authS.getUser()
      }
      console.log(this.training)
      this.api.updateTraining(this.training).then(result => {
        this.training.exercises.forEach(element => {
          let e: exercise = {
            id: element.id,
            nameExercise: element.nameExercise,
            description: element.description,
            photo: element.photo,
            creator: this.authS.getUser(),
            type: element.type,
            repTime: element.repTime,
            t: element.t
          }

          console.log("Mirar: " + e.type)
          this.api.updateExercise(e).then(result => { }).catch(err => { })
        });

        //console.log(result)
        this.present.dismissLoad();
        this.exit();
      }).catch(err => {
        console.log(err)
        this.present.dismissLoad();
        this.exit();
      })

    } else {
      let exId: exercise[] = [];
      this.training.exercises.forEach(element => {
        let e = {
          id: element.id
        }
        exId.push(e)
      });
      this.training = {
        title: this.task.get('title').value,
        time: (this.timerS.minBT * 60) + this.timerS.sBT,
        exercises: exId,
        creator: {
          id: this.authS.getUser().id,
        }
      }
      this.api.createTraning(this.training).then((respuesta) => {
        console.log(this.training)
        this.task.setValue({
          title: ''
        })
        this.reset()
        this.present.dismissLoad();
        this.exit();
      }).catch((err) => {
        console.log(err);
        this.present.dismissLoad();
      });
    }
  }

  public exit() {
    this.modalController.dismiss();
  }
}
