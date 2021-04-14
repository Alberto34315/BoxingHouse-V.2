import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG,HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {  HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CountdownModule } from 'ngx-countdown';
import { ChronometerPage } from './pages/chronometer/chronometer.page';
import { TimerService } from './services/timer.service';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { PresentService } from './services/present.service';
import { GalleryService } from './services/gallery.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AddtrainingPage } from './pages/addtraining/addtraining.page';
import { AddExercisePage } from './pages/add-exercise/add-exercise.page';
import { ListExercisePage } from './pages/list-exercise/list-exercise.page';
import { SelectExercisePage } from './pages/select-exercise/select-exercise.page';
import { ExecuteTrainingPage } from './pages/execute-training/execute-training.page';
import { StartTrainingPage } from './pages/start-training/start-training.page';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AddFriendsPage } from './pages/add-friends/add-friends.page';
import { ListfriendsPage } from './pages/listfriends/listfriends.page';
import * as Hammer from 'hammerjs';
import { GraphPage } from './pages/graph/graph.page';
import { HistoricalPage } from './pages/historical/historical.page';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable()
export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
     // override hammerjs default configuration
     'pan': {
       direction: Hammer.DIRECTION_ALL
      }
 }
}
@NgModule({
  declarations: [AppComponent,ChronometerPage, 
    AddtrainingPage,AddExercisePage,ListExercisePage,SelectExercisePage,
    ExecuteTrainingPage,StartTrainingPage,AddFriendsPage,ListfriendsPage,GraphPage,HistoricalPage/*,LoginPage,SignupPage*/],
  entryComponents: [ChronometerPage,AddtrainingPage,
    AddExercisePage,ListExercisePage,SelectExercisePage,ExecuteTrainingPage,
    StartTrainingPage,AddFriendsPage,ListfriendsPage,GraphPage,HistoricalPage/*,LoginPage,SignupPage*/],
  imports: [BrowserModule, 
    CountdownModule,
    IonicModule.forRoot(),
     AppRoutingModule,
     ReactiveFormsModule,
     HttpClientModule,
     HammerModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
  providers: [
    StatusBar,
    ApiService,
    HTTP,
    SplashScreen,
    NativeStorage,
    File,
    Camera,
    FileTransfer,
    PresentService,
    GalleryService,
    AuthService,
    TimerService,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass:MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
