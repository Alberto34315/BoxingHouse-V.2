import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { user } from 'src/app/model/user';
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
  public isPublic: boolean = false;
  exercise: exercise;
  exercises: exercise[] = [];
  text;
  mbt;
  sbt;
  timeout;
  interval;
  bTime: BehaviorSubject<string> = new BehaviorSubject("00:00");
  constructor(private modalController: ModalController,
    private authS: AuthService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private present: PresentService,
    private timerS: TimerService) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      publish: [this.isPublic]
    })
  }

  ngOnInit() {
    this.reset()
    if (this.trainingEdit.id != undefined) {
      this.isPublic = this.trainingEdit.published;
      this.training = {
        id: this.trainingEdit.id,
        title: this.trainingEdit.title,
        creator: this.authS.getUser(),
        time: this.trainingEdit.time,
        published: this.trainingEdit.published,
        exercises: this.trainingEdit.exercises
      }
      this.task = this.formBuilder.group({
        title: [this.trainingEdit.title, Validators.required],
        publish: [this.trainingEdit.published]
      })
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
        published: false,
        exercises: []
      }
    }
  }

  addBTime() {
    this.timerS.addBTime();
    this.loadBTime();
  } 
  addBTimePress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.addBTime();
        this.loadBTime();
      }, 50);
    }, 300);
  }
  removeBTimePress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.removeBTime();
        this.loadBTime();
      }, 50);
    }, 300);
  }

  removeBTime() {
    this.timerS.removeBTime();
    this.loadBTime();
  }

  loadBTime() {
    this.mbt = String('0' + Math.floor(this.timerS.minBT)).slice(-2);
    this.sbt = String('0' + Math.floor(this.timerS.sBT)).slice(-2);
    this.text = this.mbt + ':' + this.sbt;
    this.bTime.next(this.text);
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

  public async save() {
    await this.present.presentLoading();

    if (this.trainingEdit.id != undefined) {

      this.api.getAllFriends(this.authS.getUser().id).then(result=>{
          this.authS.getUser().friends=result
      }).catch(err => {
        console.log(err)
      });
     
      this.training = {
        id: this.trainingEdit.id,
        title: this.task.get('title').value,
        time: (this.timerS.minBT * 60) + this.timerS.sBT,
        published: this.isPublic,
        exercises: this.training.exercises,
        creator: this.authS.getUser()
      }
      
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
          
          this.api.updateExercise(e).then(result => { }).catch(err => { })
        });
        this.reset()
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
        published: this.isPublic,
        exercises: exId,
        creator: {
          id: this.authS.getUser().id,
        }
      }
      this.api.createTraning(this.training).then((respuesta) => {
        this.reset()
        this.task.setValue({
          title: '',
          publish: false
        })
        this.present.dismissLoad();
        this.exit();
      }).catch((err) => {
        console.log(err);
        this.present.dismissLoad();
      });
    }
  }
 
  clearPress() { //Cuando se termine de pulsar
    clearTimeout(this.timeout); //Limpiamos el timeout
    clearInterval(this.interval); //Limpiamos el intervalo
  };
  
  reset() {
    this.timerS.minBT = 0;
    this.timerS.sBT = 5;
    this.loadBTime();
  }
  public async publish($event) {
    if ($event.detail.checked) {
      this.isPublic = true;
    } else {
      this.isPublic = false;
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
}
