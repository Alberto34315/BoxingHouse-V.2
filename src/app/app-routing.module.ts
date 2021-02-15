import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate:[AuthService]
  },
  {
    path: 'chronometer',
    loadChildren: () => import('./pages/chronometer/chronometer.module').then( m => m.ChronometerPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addtraining',
    loadChildren: () => import('./pages/addtraining/addtraining.module').then( m => m.AddtrainingPageModule)
  },  {
    path: 'add-exercise',
    loadChildren: () => import('./pages/add-exercise/add-exercise.module').then( m => m.AddExercisePageModule)
  },
  {
    path: 'list-exercise',
    loadChildren: () => import('./pages/list-exercise/list-exercise.module').then( m => m.ListExercisePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
