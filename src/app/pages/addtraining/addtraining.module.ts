import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtrainingPageRoutingModule } from './addtraining-routing.module';

import { AddtrainingPage } from './addtraining.page';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddtrainingPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddtrainingPage]
})
export class AddtrainingPageModule {}
