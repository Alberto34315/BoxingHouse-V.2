import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { user } from '../model/user';
import { FavoritesPage } from '../pages/favorites/favorites.page';
import { GraphPage } from '../pages/graph/graph.page';
import { HistoricalPage } from '../pages/historical/historical.page';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';
import { PresentService } from '../services/present.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  avatar: any;
  public isPublic: boolean = true;
  user: user = {
    id: -1,
    name: '',
    avatar: '',
    pass: '',
    email: ''
  };
  constructor(private router: Router,
    private authS: AuthService,
    private galleryS: GalleryService,
    private present: PresentService,
    private api: ApiService,
    private modalController: ModalController) { }

  ngOnInit() {
    // this.loadUser();
  }

  async ionViewDidEnter() {
    await this.loadUser();
  }

  async openHistorical(): Promise<any> {
    const modal = await this.modalController.create({
      component: HistoricalPage,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  async openGraph(): Promise<any> {
    const modal = await this.modalController.create({
      component: GraphPage,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  async openFavorites(): Promise<any> {
    const modal = await this.modalController.create({
      component: FavoritesPage,
      cssClass: 'my-custom-class',
      componentProps: {
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  async loadUser() {
    // await this.present.presentLoading;
    try {
      this.api.getUser(this.authS.getUser().id).then(result => {
        this.user = {
          id: result.id,
          name: result.name,
          avatar: result.avatar,
          pass: result.pass,
          email: result.email/*,
          lt:this.authS.getUser().lt,
          le:this.authS.getUser().le,
          lrecords:this.authS.getUser().lrecords*/,
          friends: result.friends,
          privateCount: result.privateCount
        } 
         this.isPublic = this.user.privateCount;
      }).catch(err => {

      });
    } catch (err) {
      await this.present.presentToast("Error al cargar al usuario", "danger");
    }
  }
  public async setAvatar() {
    await this.present.presentLoading();
    this.galleryS.getImage().then((respuesta) => {
      if (this.galleryS.myphoto === undefined) {
        this.loadUser();
        this.present.dismissLoad();
      } else {
        this.user.avatar = this.galleryS.myphoto;
        this.api.updateUser(this.user).then((respuesta) => {
          this.loadUser();
        }).catch((err) => {
          console.log(err)
        });
        this.authS.setUser(this.user)
        this.present.dismissLoad();
      }
    }).catch((err) => {
      console.log(err)
    });
  }
  public async publish($event) {
    if ($event.detail.checked) {
      this.isPublic = true;
    } else {
      this.isPublic = false;
    }
    this.user.privateCount = this.isPublic
    this.api.updateUser(this.user).then((respuesta) => {
      this.loadUser();
    }).catch((err) => {
      console.log(err)
    });
    this.authS.setUser(this.user)
  }
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login']);
    }
  }
}
