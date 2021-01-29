import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronometerPageRoutingModule } from './chronometer-routing.module';

import { ChronometerPage } from './chronometer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChronometerPageRoutingModule
  ],
  declarations: [ChronometerPage]
})
export class ChronometerPageModule {}
