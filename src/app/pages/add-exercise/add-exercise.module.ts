import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExercisePageRoutingModule } from './add-exercise-routing.module';

import { AddExercisePage } from './add-exercise.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddExercisePageRoutingModule,
    TranslateModule
  ],
  declarations: [AddExercisePage]
})
export class AddExercisePageModule {}
