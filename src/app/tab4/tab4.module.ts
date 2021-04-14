import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { TranslateModule } from '@ngx-translate/core';
import { PopoverComponent } from '../components/popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    TranslateModule
  ],
  declarations: [Tab4Page,PopoverComponent]
})
export class Tab4PageModule {}
