import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class PresentService {
  private isLoading: any;
  options: LoadingOptions = {
    message: '<ion-spinner name="circles" paused></ion-spinner>',
    cssClass: 'loader',
    translucent: true,
    showBackdrop: true,
    spinner: null,
    mode: 'md',
    keyboardClose: true
  };
  constructor(private loadingController: LoadingController,
    private toastController: ToastController) { }

  /**
   * Funcion que ejecuta el Loading
   */
  async presentLoading() {
    if (this.isLoading) {
      this.loadingController.dismiss();
    }
    this.isLoading = await this.loadingController.create(this.options);
    await this.isLoading.present();
  }
  /**
   * Funcion que muestra un toast
   * @param msg msg Mensaje del toast
   * @param col color del toast
   */
  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  /**
  * Funcion que detiene el Loading
  */
  public async dismissLoad() {
    await this.loadingController.dismiss();
    this.isLoading = null;
  }
}
