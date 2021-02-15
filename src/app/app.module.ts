import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent,ChronometerPage, AddtrainingPage,AddExercisePage,ListExercisePage/*,LoginPage,SignupPage*/],
  entryComponents: [ChronometerPage,AddtrainingPage,AddExercisePage,ListExercisePage/*,LoginPage,SignupPage*/],
  imports: [BrowserModule, 
    CountdownModule,
    IonicModule.forRoot(),
     AppRoutingModule,
     ReactiveFormsModule,
     HttpClientModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
