import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListfriendsPageRoutingModule } from './listfriends-routing.module';

import { ListfriendsPage } from './listfriends.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListfriendsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ListfriendsPage]
})
export class ListfriendsPageModule {}
