import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectExercisePage } from './select-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: SelectExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectExercisePageRoutingModule {}
