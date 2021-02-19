import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExecuteTrainingPageRoutingModule } from './execute-training-routing.module';

import { ExecuteTrainingPage } from './execute-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExecuteTrainingPageRoutingModule
  ],
  declarations: [ExecuteTrainingPage]
})
export class ExecuteTrainingPageModule {}
