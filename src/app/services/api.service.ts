import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { exercise } from '../model/exercise';
import { training } from '../model/training';
import { user } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HTTP) { }

  public getTrainings(id?:number | string): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining;
      if(id){
        endpoint+=id;
      }
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }
  public getTrainingsByUser(id?:number): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining+"user/"+id;
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }
  public getExercisesByUser(id?:number): Promise<exercise[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiExercise+"user/"+id;
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }

  public searchCredentials(email:String,pass:String): Promise<user | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiUser+"search/email/"+email+"/"+pass;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            
            resolve(JSON.parse(d.data));

          } else {
            resolve(null);
          }


        })
        .catch(err => reject(err));
    });

  }

  public updateUser(item: user): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUser;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch((err) => {
           reject(err)
          });
      } else {
        reject('No existe item');
      }
    });
  }

  public searchEmail(email:String): Promise<user | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiUser+"search/email/"+email;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            console.log(d.data)
            resolve(JSON.parse(d.data));

          } else {
            resolve(null);
          }


        })
        .catch(err => reject(err));
    });

  }
  public createUser(item: user): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUser;
    return new Promise((resolve, reject) => {
      if (item) {
        
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
          console.log(d)
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  public createTraning(item: training): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTraining;
    return new Promise((resolve, reject) => {
      if (item) {
        
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
          console.log(d)
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }
  public createExercise(item: exercise): Promise<void> {
    const endpoint = environment.endpoint + environment.apiExercise;
    return new Promise((resolve, reject) => {
      if (item) {
        
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
          console.log(d)
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  public searchByTitle(value:string,id:number): Promise<training[] | null> {
    return this.getTrainings('search/' +value+"/user/"+id);
  }
  public removeTraining(item: any): Promise<void> {
    console.log(item)
    const id: any = item.id ? item.id : item;
    const endpoint = environment.endpoint + environment.apiTraining + id;
    console.log(endpoint)
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }
public removeExercise(item: any): Promise<void> {
    console.log(item)
    const id: any = item.id ? item.id : item;
    const endpoint = environment.endpoint + environment.apiExercise + id;
    console.log(endpoint)
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }
  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      }
    }
}
