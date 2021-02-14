import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { exercise } from 'src/app/model/exercise';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-addtraining',
  templateUrl: './addtraining.page.html',
  styleUrls: ['./addtraining.page.scss'],
})
export class AddtrainingPage implements OnInit {
  training:training
  public task: FormGroup;
  exercise:exercise;
  exercises:exercise[]=[];
  constructor(private modalController: ModalController,
    private authS: AuthService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private present: PresentService,
    private timerS:TimerService) { 
      this.task = this.formBuilder.group({
        title: ['', Validators.required]
      })
    }

  ngOnInit() {
  }
  addBTime(){
    this.timerS.addBTime();
  }
  removeBTime(){
    this.timerS.removeBTime();
  }
  /*
  addExercise(){
    this.exercise={
      photo:'',
      nameExercise:'',
      description:'',
      type:'',
      repTime:0
    }
    this.exercises.push(this.exercise);
  }

  removeExercise(){
    if(this.exercises.length>0){
      this.exercises.pop();
    }
   }*/

  public async save(){
    await this.present.presentLoading();
    this.exercises.forEach(element => {
      this.api.createExercise(element).then(resul=>{
      }).catch(err=>{
      })
    });
    this.training={
      title:this.task.get('title').value,
      time:(this.timerS.minBT * 60) + this.timerS.sBT,
      exercises:[],
      creator:this.authS.getUser()
    }
    this.api.createTraning(this.training).then((respuesta) => {
      this.task.setValue({
        title: ''
      })
      this.present.dismissLoad();
      this.exit();
    }).catch((err) => {
    });
  }

  public exit() {
    this.modalController.dismiss();
  }
}
