import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExercisePageRoutingModule } from './add-exercise-routing.module';

import { AddExercisePage } from './add-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddExercisePageRoutingModule
  ],
  declarations: [AddExercisePage]
})
export class AddExercisePageModule {}
