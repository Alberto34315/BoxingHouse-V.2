import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListExercisePage } from './list-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: ListExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListExercisePageRoutingModule {}
