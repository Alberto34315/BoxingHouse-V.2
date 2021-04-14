import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricalPageRoutingModule } from './historical-routing.module';

import { HistoricalPage } from './historical.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricalPageRoutingModule,
    TranslateModule
  ],
  declarations: [HistoricalPage]
})
export class HistoricalPageModule {}
