import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExecuteTrainingPage } from './execute-training.page';

const routes: Routes = [
  {
    path: '',
    component: ExecuteTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecuteTrainingPageRoutingModule {}
