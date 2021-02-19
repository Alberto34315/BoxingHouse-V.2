import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectExercisePageRoutingModule } from './select-exercise-routing.module';

import { SelectExercisePage } from './select-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectExercisePageRoutingModule
  ],
  declarations: [SelectExercisePage]
})
export class SelectExercisePageModule {}
