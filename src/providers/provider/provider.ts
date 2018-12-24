import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/Operator/map';
import { Constants } from '../../utils/constants';
import { GlobalData } from '../../utils/globalData';

/*
  Generated class for the Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServeProvider {

  constructor(public http: Http) {
    console.log('Hello Provider Provider');
  }
  
  login(body){
    let url = Constants.server_url+'users/login';
    return this.http.post(url,body).map(res=>res.json());
  }
  addAccount(body){
    let url = Constants.server_url+'users/add_user';
    return this.http.post(url,body).map(res=>res.json());
  }
  getUsers(){
    let url = Constants.server_url+'users/';
    return this.http.get(url).map(res=>res.json());

  }

}
