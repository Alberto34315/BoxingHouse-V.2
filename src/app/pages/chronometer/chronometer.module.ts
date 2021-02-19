import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronometerPageRoutingModule } from './chronometer-routing.module';

import { ChronometerPage } from './chronometer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChronometerPageRoutingModule,
    TranslateModule
  ],
  declarations: [ChronometerPage]
})
export class ChronometerPageModule {}
