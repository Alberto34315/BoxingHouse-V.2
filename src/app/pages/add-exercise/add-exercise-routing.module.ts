import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExercisePage } from './add-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: AddExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExercisePageRoutingModule {}
