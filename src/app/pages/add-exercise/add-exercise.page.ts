import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { exercise } from 'src/app/model/exercise';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
})
export class AddExercisePage implements OnInit {
  num = 1;
  public task: FormGroup;
  exercise: exercise;
  constructor(private authS: AuthService,
    private api: ApiService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private galleryS: GalleryService,
    private present: PresentService) {
    this.task = this.formBuilder.group({
      exercise: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  ngOnInit() {
this.loadExercise()
  }
  loadExercise(){
    this.exercise = {
      photo: '',
      nameExercise: '',
      description: '',
      type: '',
      repTime: this.num,
      creator: this.authS.getUser(),
      trainings:[]
    }
  }
  public async setAvatar() {
     await this.present.presentLoading();
    this.galleryS.getImage().then((respuesta) => {
      this.exercise.photo= this.galleryS.myphoto
      this.present.dismissLoad();
    }).catch((err) => {
      console.log(err)
      this.present.dismissLoad();
    });
  }
  public async save() {
    await this.present.presentLoading();
    this.exercise.photo
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

  addTRounds() {
    this.num++;
  }
  removeTRounds() {
    if (this.num > 1) {
      this.num--;
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
}
