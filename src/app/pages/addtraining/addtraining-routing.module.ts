import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtrainingPage } from './addtraining.page';

const routes: Routes = [
  {
    path: '',
    component: AddtrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtrainingPageRoutingModule {}
