import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { exercise } from '../model/exercise';
import { records } from '../model/records';
import { training } from '../model/training';
import { user } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HTTP) { }
  //_______________________________________________________________________________GET
  /**
   * Devuelve una promesa con todos los entrenamientos de la base de datos
   * @param id recibe un numbre o un String
   */
  public getTrainings(id?: number | string): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining;
      if (id) {
        endpoint += id;
      }
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve la promesa de un usuario, por el id del usuario
   * @param id recibe un numbre o un String
   */
  public getUser(id?: number | string): Promise<user | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUser;
      if (id) {
        endpoint += id;
      }
      this.http
        .get(endpoint, {}, this.header)
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

  /**
 * Devuelve una promesa con una lista de los usuarios, que tienen relacion con un entrenamiento favorito (Pasamos el id del enrenamiento)
 * @param id recibe un numbre o un String
 */
  public getAllUsersByIdTrainingFavorite(id?: number): Promise<user[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUser + 'favoriteUser/' + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
  * Devuelve una promesa con una lista de entrenamientos favoritos por el id del usuario
  * @param id recibe un numbre o un String
  */
  public getAllTrainingsFromFavorites(id?: number): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + 'favoriteTraining/' + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
  * Devuelve una promesa con todos los entrenamientos realizados de la base de datos
  * @param id recibe un numbre o un String
  */
  public getRecords(id?: number | string): Promise<records[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiRecord;
      if (id) {
        endpoint += id;
      }
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con todos los ejercicios de la base de datos
   * @param id recibe un numbre o un String
   */
  public getExercises(id?: number | string): Promise<exercise[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiExercise;
      if (id) {
        endpoint += id;
      }
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con todos los entrenamientos de la base de datos por id del usuario
   * @param id recibe un number
   */
  public getTrainingsByUser(id?: number): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + "user/" + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con todos los entrenamientos realizados de la base de datos por id del usuario
   * @param id recibe un number
   */
  public getRecordsByUser(id?: number): Promise<| records[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiRecord + "user/" + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con los 7 ultimos entrenamientos realizados por el usuario
   * @param id recibe un number
   */
  public getLastSevenRecordsByIdUser(id?: number): Promise<| records[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiRecord + "lastTrainings/" + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
     * Devuelve una promesa con el numero de entrenamientos realizados en una fecha
     * @param date string
     * @param id number
     */
  public getNumberOfTrainingsForDate(date?: string, id?: number): Promise<number | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiRecord + "date/" + date + "%20%25/" + environment.apiUser + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con un 1 si el entrenamiento y el usuario se encuentran en la relacion y 0 si no
   * @param idT number
   * @param idU number
   */
  public isTrainingFavorite(idT?: number, idU?: number): Promise<number | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + 'isFavorite/' + idT + '/' + environment.apiUser + idU;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con todos los entrenamientos de la base de datos por id del usuario y si son publicos
   * @param id recibe un number
   */
  public getAllTrainingsByIdUserIsPublished(id?: number): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + "user/published/" + id;
      this.http
        .get(endpoint, {}, this.header)
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
  /**
   * Devuelve una promesa con todos los usuarios que no son amigos de un usuario
   * @param id recibe un number
   */
  public getAllUserLessOwner(id?: number): Promise<user[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUser + "getAllUserLessOwner/" + id;
      this.http
        .get(endpoint, {}, this.header)
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
  /**
 * Devuelve una promesa con todos los usuarios que no son amigos de un usuario buscados por su nombre
 * @param id recibe un number
 */
  public searchUserLessOwner(id?: number, name?: string): Promise<user[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUser + "searchUserLessOwner/" + id + "/" + name;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
* Devuelve una promesa con una lista de entrenamientos favoritos buscados por title
* @param id recibe un number
*/
  public searchTrainingsFromFavorites(id?: number, title?: string): Promise<training[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + "search/" + environment.apiUser + id + "/favoriteTraining/" + title;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con todos los usuarios que son amigos de un usuario
   * @param id recibe un number
   */
  public getAllFriends(id?: number): Promise<user[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUser + "getAllFriends/" + id;

      this.http
        .get(endpoint, {}, this.header)
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
  /**
   * Devuelve una promesa con todos los usuarios que son amigos de un usuario buscados por su nombre
   * @param id recibe un number
   */
  public searchFriends(id?: number, name?: string): Promise<user[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUser + "searchFriends/" + id + "/" + name;

      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una promesa con todos los usuarios que son amigos de un usuario buscados por su nombre
   * @param id recibe un number
   */
  public searchRecords(id?: number, name?: string): Promise<records[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiRecord + "searchRecord/" + id + "/" + name;

      this.http
        .get(endpoint, {}, this.header)
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
  /**
   * Devuelve un entrenamiento por su id
   * @param id number
   */
  public getTrainingsById(id?: number): Promise<training | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve un entrenamiento por su id
   * @param id number
   */
  public getTrainingById(id: number): Promise<training | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTraining + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Devuelve una lista de ejercicios por el id del usuario
   * @param id number
   */
  public getExercisesByUser(id?: number): Promise<exercise[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiExercise + "user/" + id;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
 * Devuelve una lista de ejercicios por el id del usuario, filtrando si ya se encuentran los ejercicios en el entrenamiento
 * @param idU number
 * @param idT number
 */
  public getAllExercisesByIdUserAndNotFoundTraining(idU?: number): Promise<exercise[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiExercise + environment.apiUser+ 'exercises/' + idU ;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
* Devuelve una lista de ejercicios por el id del usuario, filtrando si ya se encuentran los ejercicios en el entrenamiento y por su nombre
* @param idU number
* @param idT number
*/
  public searchAllExercisesByIdUserAndNotFoundTraining(idU?: number, nameEx?: string): Promise<exercise[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiExercise + environment.apiUser+'exercises/' + idU + '/search/' + nameEx;
      this.http
        .get(endpoint, {}, this.header)
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

  /**
   * Comprueba si el usuario existe en la base de datos
   * @param email string
   * @param pass string
   */
  public searchCredentials(email: String, pass: String): Promise<user | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiUser + "search/email/" + email + "/" + pass;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            // console.log(d.data)
            resolve(JSON.parse(d.data));

          } else {
            resolve(null);
          }


        })
        .catch(err => reject(err));
    });

  }
  /**
   * Comprueba si el usuario existe en la base de datos
   * @param email recibe un string
   */
  public searchEmail(email: String): Promise<user | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiUser + "search/email/" + email;
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
  /**
   * Busca entrenamientos por titulo y por el id del usuario
   * @param value String
   * @param id number
   */
  public searchByTitle(value: string, id: number): Promise<training[] | null> {
    return this.getTrainings('search/' + value + "/user/" + id);
  }

  /**
  * Busca entrenamientos de los amigos de un usuario por titulo y por el id del usuario
  * @param value String
  * @param id number
  */
  public searchTrainingOfFriendsByTitle(value: string, id: number): Promise<training[] | null> {
    return this.getTrainings('search/' + value + "/user/friend/" + id);
  }

  /**
   * Busca ejercicios por nombre y por el id del usuario
   * @param value String
   * @param id number
   */
  public searchExerciseByTitle(value: string, id: number): Promise<exercise[] | null> {
    return this.getExercises('search/' + value + "/user/" + id);
  }


  //______________________________________________________________________________________UPDATE
  /**
   * Actualiza el ejercicio pasado
   * @param item recibe un exercise
   */
  public updateExercise(item: exercise): Promise<void> {
    const endpoint = environment.endpoint + environment.apiExercise;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  /**
   * Actualiza el record pasado
   * @param item recibe un record
   */
  public updateRecord(item: records): Promise<void> {
    const endpoint = environment.endpoint + environment.apiRecord;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  /**
   * Actualiza el entrenamiento pasado
   * @param item recibe un training
   */
  public updateTraining(item: training): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTraining;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => {
            console.log(err.error)
            reject(err)
          });
      } else {
        reject('No existe item');
      }
    });
  }

  /**
   * Actualiza el usuario pasado
   * @param item recibe un user
   */
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

  //_________________________________________________________________________________CREATE
  /**
   * Crea un usuario
   * @param item recibe un user
   */
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

  /**
    * Crea un record
    * @param item recibe un record
    */
  public createRecord(item: records): Promise<any> {
    const endpoint = environment.endpoint + environment.apiRecord;
    return new Promise((resolve, reject) => {
      if (item) {
        console.log(item)
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            resolve(d.data);
          })
          .catch(err => {
            console.log('Error ' + err.error)
            reject(err)
          });
      } else {
        reject('No existe item');
      }
    });
  }

  /**
   * Crea un entrenamiento
   * @param item recibe un training
   */
  public createTraning(item: training): Promise<any> {
    const endpoint = environment.endpoint + environment.apiTraining;
    return new Promise((resolve, reject) => {
      if (item) {

        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            resolve(d.data);
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  /**
   * Crea un ejercicio
   * @param item recibe un exercise
   */
  public createExercise(item: exercise): Promise<void> {
    const endpoint = environment.endpoint + environment.apiExercise;
    return new Promise((resolve, reject) => {
      if (item) {

        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            console.log(JSON.parse(d.data))
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  /**
   * Crea la relacion entre un entrenamientos favorito y un usuario
   * @param item recibe un training
   * @param user recibe un user
   */
  public createTrainingFavorite(item: training, user: user): Promise<any> {
    const endpoint = environment.endpoint + environment.apiTraining + 'insertFavorite/' + item.id + '/' + environment.apiUser + user.id;;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            resolve(d.data);
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }
  //______________________________________________________________________________DELETE
  /**
   * Elimina el entrenamiento pasado
   * @param item recibe un training
   */
  public removeTraining(item: any): Promise<void> {
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

  /**
     * Elimina el record pasado
     * @param item recibe un record
     */
  public eRecord(item: any): Promise<void> {
    const id: any = item.id ? item.id : item;
    const endpoint = environment.endpoint + environment.apiRecord + id;
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

  /**
     * Elimina el record por el entrenamientos pasado
     * @param item recibe un record
     */
  public removeTrainingFromRecord(item: any): Promise<void> {
    const id: any = item.id ? item.id : item;
    const endpoint = environment.endpoint + environment.apiRecord + "trainingId/" + id;
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
  /**
   * Elimina la relacion entre el ejercicio y el entrenamiento
   * @param t training
   * @param e exercise
   */
  deleteFromListExercise(t: training, e: exercise): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTraining + t.id + '/' + environment.apiExercise + e.id;
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

  /**
   * Elimina la relacion entre dos usuarios amigos
   * @param owner user
   * @param friend user
   */
  deleteFromFriendship(owner: user, friend: user): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUser + owner.id + '/' + "friend/" + friend.id;
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

  /**
    * Elimina la relacion entre el entrenamiento favorito y un usuario
    * @param t training
    * @param u user
    */
  deleteTrainingFavorite(t: training, u: user): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTraining + 'delFavorite/' + t.id + '/' + environment.apiUser + u.id;
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
  /**
    * Elimina la relacion entre el entrenamiento favorito y un usuario
    * @param t training
    * @param u user
    */
  deleteAllTrainingsFavorite(t: training): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTraining + 'delAllFavorite/' + t.id;
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

  /**
   * Elimina el ejercicio pasado
   * @param item recibe un ejercicio
   */
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

  //_______________________________________HEADER
  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
}
