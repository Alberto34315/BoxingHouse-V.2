import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartTrainingPageRoutingModule } from './start-training-routing.module';

import { StartTrainingPage } from './start-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartTrainingPageRoutingModule
  ],
  declarations: [StartTrainingPage]
})
export class StartTrainingPageModule {}
