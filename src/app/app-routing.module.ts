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
  },
  {
    path: 'select-exercise',
    loadChildren: () => import('./pages/select-exercise/select-exercise.module').then( m => m.SelectExercisePageModule)
  },
  {
    path: 'execute-training',
    loadChildren: () => import('./pages/execute-training/execute-training.module').then( m => m.ExecuteTrainingPageModule)
  },
  {
    path: 'start-training',
    loadChildren: () => import('./pages/start-training/start-training.module').then( m => m.StartTrainingPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'add-friends',
    loadChildren: () => import('./pages/add-friends/add-friends.module').then( m => m.AddFriendsPageModule)
  },
  {
    path: 'listfriends',
    loadChildren: () => import('./pages/listfriends/listfriends.module').then( m => m.ListfriendsPageModule)
  },
  {
    path: 'historical',
    loadChildren: () => import('./pages/historical/historical.module').then( m => m.HistoricalPageModule)
  },
  {
    path: 'graph',
    loadChildren: () => import('./pages/graph/graph.module').then( m => m.GraphPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
