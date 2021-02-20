import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../model/user';
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
    private api: ApiService) { }

  ngOnInit() {
    this.loadUser();
  }
  
  
  loadUser(){
    this.user = {
      id: this.authS.getUser().id,
      name: this.authS.getUser().name,
      avatar: this.authS.getUser().avatar,
      pass: this.authS.getUser().pass,
      email: this.authS.getUser().email,
      trainings:this.authS.getUser().trainings
    }
  }
  public async setAvatar() {
    await this.present.presentLoading();
    this.galleryS.getImage().then((respuesta) => {
      if (this.galleryS.myphoto === undefined) {
        this.loadUser();
        this.present.dismissLoad();
      } else {
        this.user = {
          id: this.authS.getUser().id,
          name: this.authS.getUser().name,
          avatar: this.galleryS.myphoto,
          pass: this.authS.getUser().pass,
          email: this.authS.getUser().email,
          trainings:this.authS.getUser().trainings
        }
        this.api.updateUser(this.user).then((respuesta) => {
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
  
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login']);
    }
  }
}
