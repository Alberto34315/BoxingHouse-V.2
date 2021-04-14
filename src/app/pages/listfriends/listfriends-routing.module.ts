import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListfriendsPage } from './listfriends.page';

const routes: Routes = [
  {
    path: '',
    component: ListfriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListfriendsPageRoutingModule {}
