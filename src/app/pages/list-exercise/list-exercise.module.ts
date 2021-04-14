import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExercisePageRoutingModule } from './list-exercise-routing.module';

import { ListExercisePage } from './list-exercise.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListExercisePageRoutingModule,
    TranslateModule
  ],
  declarations: [ListExercisePage]
})
export class ListExercisePageModule {}
