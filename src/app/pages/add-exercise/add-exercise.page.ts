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
  public task: FormGroup;
  num = 1;
  exercise: exercise;
  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder,
    private present: PresentService,
    private authS: AuthService,
    private galleryS: GalleryService,
    private api: ApiService) {
    this.task = this.formBuilder.group({
      exercise: ['', Validators.required],
      description: ['', Validators.required],
      type:['',Validators.required]
    })
  }

  ngOnInit() {
  }
  public async setAvatar() {
    //await this.present.presentLoading();
    this.galleryS.getImage().then((respuesta) => {
     
    }).catch((err) => {
      console.log(err)
    });
  }
  
  public async save(){
    await this.present.presentLoading();
    this.exercise={
      nameExercise:this.task.get('exercise').value,
      description:this.task.get('description').value,
      type:this.task.get('type').value,
      repTime:this.num,
      photo:"Photo",
      trainings:[]
    }
    this.api.createExercise(this.exercise).then((respuesta) => {
      this.task.setValue({
        exercise: '',
      description: '',
      type:''
      })
      this.present.dismissLoad();
      this.exit();
    }).catch((err) => {
    });
  }

  addRepT() {
    this.num++;
  }
  removeRepT() {
    if (this.num > 1) {
      this.num--;
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
}
