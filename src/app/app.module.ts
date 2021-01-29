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
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent,ChronometerPage],
  entryComponents: [ChronometerPage],
  imports: [BrowserModule, 
    CountdownModule,
    IonicModule.forRoot(),
     AppRoutingModule,
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
    SplashScreen,
    NativeStorage,
    TimerService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
