import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { exercise } from 'src/app/model/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  @Input() exercise:exercise;
  num=1;
  public task: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.task = this.formBuilder.group({
      exercise: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit() {}

  addTRounds(){
    this.num++;
   }
   removeTRounds(){
    if(this.num>1){
     this.num--;
    }
   }

   
  
}
