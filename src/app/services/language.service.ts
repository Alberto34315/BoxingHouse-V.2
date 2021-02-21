import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = 'SELECTED_LANGUAGE';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = "";
  constructor(private translate: TranslateService,
    private storage: NativeStorage) { }

    /**
     * Inicia la aplicacion con el idioma del dispositivo o con el idioma seleccionado
     */
  public setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.storage.getItem(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }
  /**
   * Devuelve los idiomas 
   */
  public getLanguages() {
    return [
      { text: "English", value: "en",img:"assets/imgs/espana.png" },
      { text: "Spanish", value: "es",img:"assets/imgs/reino-unido.svg" }
    ]
  }
  /**
   * Modifica el idioma
   * @param lng recibe un idioma
   */
  public setLanguage(lng) {
    this.translate.use(lng);
    this.selected=lng;
    this.storage.setItem(LNG_KEY,lng);
  }
}
