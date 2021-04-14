import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExecuteTrainingPageRoutingModule } from './execute-training-routing.module';

import { ExecuteTrainingPage } from './execute-training.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExecuteTrainingPageRoutingModule,
    TranslateModule
  ],
  declarations: [ExecuteTrainingPage]
})
export class ExecuteTrainingPageModule {}
