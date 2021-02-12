import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:user= {
    id: -1,
    name: '',
    avatar: '',
    pass:'',
    email:''
  };
  constructor(private storage: NativeStorage,
    private router:Router) { }

    async init() {
      //  console.log("AL INICIO DE LOS TIEMPOS")
        let u = null;
        try {
          u = await this.storage.getItem("user");
        } catch (err) {
          u = null;
        }
        if (u != null) {
          this.user = u;
        }
      }
      public isLogged(): boolean {
        if (this.user.id == -1) {
          return false;
        } else {
          return true;
        }
      }
      public async logout(){
        this.user = {
          id: -1,
          name: '',
          avatar: '',
          pass:'',
          email:''
        }
        await this.storage.setItem("user",this.user);
      }
      public async login(u:user) {
        try {
          
        //  console.log(u)
          if (u) {
         //   console.log("OK")
            this.user = {
              id: u['id'],
              name: u['name'],
              avatar: u['avatar'],
              pass: u['pass'],
              email:u['email']
            }
           // console.log(this.user);
          }
        } catch (err) {
          this.user = {
            id: -1,
            name: '',
            avatar: '',
            pass: '',
            email:''
          }
        }
        await this.storage.setItem("user",this.user);
        return this.user;
      }

      canActivate(route: ActivatedRouteSnapshot): boolean {
        // console.log("ESTOY EN CANACTIVATE Y EL RESULT ES "+this.isLogged())
         if (!this.isLogged()) {
           this.router.navigate(["login"]);
           return false;
         }
         return true;
       }
       getUser(){
         return this.user;
       }
       setUser(u:user){
       this.storage.setItem("user",u);
       }
}
