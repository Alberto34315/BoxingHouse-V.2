import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect, IonSelectOption, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { PresentService } from 'src/app/services/present.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
})
export class AddExercisePage implements OnInit {
  @Input("exerciseEdit") exerciseEdit: exercise;
  num = 1;
  text;
  m;
  s;
  tm;
  ts;
  timeout;
  interval;
  timeExer: BehaviorSubject<string> = new BehaviorSubject("00:00");
  public tipo: String = "Repetitions";
  public task: FormGroup;
  exercise: exercise;
  constructor(private authS: AuthService,
    private api: ApiService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private galleryS: GalleryService,
    private present: PresentService,
    private timerS: TimerService) {
    this.task = this.formBuilder.group({
      exercise: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.galleryS.myphoto = './assets/imgs/imgDefault.png'
    this.loadExercise()
  }
  loadExercise() {
    this.api.getAllFriends(this.authS.getUser().id).then(result => {
      this.authS.getUser().friends = result
    }).catch(err => {
      console.log(err)
    });
    if (this.exerciseEdit != undefined) {
      this.exercise = {
        id: this.exerciseEdit.id,
        photo: this.exerciseEdit.photo,
        nameExercise: this.exerciseEdit.nameExercise,
        description: this.exerciseEdit.description,
        type: this.exerciseEdit.type,
        repTime: this.exerciseEdit.repTime,
        creator: this.authS.getUser(),
        t: this.exerciseEdit.t
      }
      this.task = this.formBuilder.group({
        exercise: [this.exerciseEdit.nameExercise, Validators.required],
        description: [this.exerciseEdit.description, Validators.required],
        type: [this.exerciseEdit.type, Validators.required]
      })
      if (this.exerciseEdit.repTime < 60) {
        this.timerS.min = 0;
        this.timerS.s = this.exerciseEdit.repTime
      } else {
        this.timerS.min = parseInt((this.exerciseEdit.repTime / 60).toFixed());
        this.timerS.s = (this.exerciseEdit.repTime % 60)
      }
      this.tipo = this.exerciseEdit.type;
      this.num = this.exerciseEdit.repTime
    } else {
    this.timerS.s = 1;
      this.exercise = {
        photo: './assets/imgs/imgDefault.png',
        nameExercise: '',
        description: '',
        type: '',
        repTime: this.num,
        creator: this.authS.getUser(),
        t: []
      }
    }
  }

  public async setAvatar() {
    await this.present.presentLoading();
    this.galleryS.getImage().then((respuesta) => {
      this.exercise.photo = this.galleryS.myphoto
      this.present.dismissLoad();
    }).catch((err) => {
      console.log(err)
      this.present.dismissLoad();
    });
  }

  public async save() {
    await this.present.presentLoading();
    if (this.exerciseEdit != undefined) {


      if (this.galleryS.myphoto == './assets/imgs/imgDefault.png') {
        this.galleryS.myphoto = this.exerciseEdit.photo
      }
      this.num = this.timerS.s + (60 * this.timerS.min)
      this.exercise = {
        id: this.exerciseEdit.id,
        photo: this.galleryS.myphoto,
        nameExercise: this.task.get('exercise').value,
        description: this.task.get('description').value,
        type: this.task.get('type').value,
        repTime: this.num,
        creator: this.authS.getUser()
      }
      console.log(this.exercise);
      this.api.updateExercise(this.exercise).then((respuesta) => {
        this.task.setValue({
          exercise: '',
          description: '',
          type: ''
        })

        this.present.dismissLoad();
        this.exit();
      }).catch((err) => {
      });

    } else {
      this.exercise = {
        photo: this.galleryS.myphoto,
        nameExercise: this.task.get('exercise').value,
        description: this.task.get('description').value,
        type: this.task.get('type').value,
        repTime: this.num,
        creator: this.authS.getUser()
      }

      this.api.createExercise(this.exercise).then((respuesta) => {
        this.task.setValue({
          exercise: '',
          description: '',
          type: ''
        })
        this.present.dismissLoad();
        this.exit();
      }).catch((err) => {
      });
    }

  }
  addTRoundsPress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.addTRounds();
        this.loadTimeExercise();
      }, 50);
    }, 300);
  }
  addTRounds() {
    this.timerS.addTRounds();
    this.loadTimeExercise();
  }

  removeTRoundsPress() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.timerS.removeT();
        this.loadTimeExercise();
      }, 50);
    }, 300);
  }
  removeTRounds() {
    this.timerS.removeT();
    this.loadTimeExercise();
  }

  clearPress() { //Cuando se termine de pulsar
    clearTimeout(this.timeout); //Limpiamos el timeout
    clearInterval(this.interval); //Limpiamos el intervalo
  };

  loadTimeExercise(): boolean {
    let flag: boolean = false;
    if (this.tipo == "Time") {
      flag = true
      this.tm = String('0' + Math.floor(this.timerS.min)).slice(-2);
      this.ts = String('0' + Math.floor(this.timerS.s)).slice(-2);
      this.text = this.tm + ':' + this.ts;
      this.timeExer.next(this.text);
    } else {
      this.num = this.timerS.s + (60 * this.timerS.min)
      flag = false
    }
    return flag
  }
  public exit() {
    this.modalController.dismiss();
  }
}
