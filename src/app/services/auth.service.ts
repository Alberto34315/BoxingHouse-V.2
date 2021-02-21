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
    /**
     * Carga al usuario cuando inicia la aplicacion
     */
    async init() {
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
      /**
       * Método que te dice si hay un usuario logeado
       */
      public isLogged(): boolean {
        if (this.user.id == -1) {
          return false;
        } else {
          return true;
        }
      }

      /**
       * Metodo para cerrar sesión
       */
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
      /**
       * Metodo para iniciar sesión
       * @param u recibe un user
       */
      public async login(u:user) {
        try {
          if (u) {
            this.user = {
              id: u['id'],
              name: u['name'],
              avatar: u['avatar'],
              pass: u['pass'],
              email:u['email']
            }
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

      /**
       * Comprueba si el usuario esta logueado lo lleva la pagina de inicio y si no esta logueado
       * lo lleva a la pagina de login
       * @param route recibe un ActivatedRouteSnapshot
       */
      canActivate(route: ActivatedRouteSnapshot): boolean {
         if (!this.isLogged()) {
           this.router.navigate(["login"]);
           return false;
         }
         return true;
       }
       /**
        * Metodo que devuelve un usuario
        */
       getUser(){
         return this.user;
       }

       /**
        * Metodo para modificar al usuario
        * @param u recibe un user
        */
       setUser(u:user){
       this.storage.setItem("user",u);
       }
}
