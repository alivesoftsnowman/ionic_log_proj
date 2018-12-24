import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServeProvider } from '../../providers/provider/provider';

/**
 * Generated class for the MemberlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memberlist',
  templateUrl: 'memberlist.html',
})
export class MemberlistPage {
 
  users : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public listviewProvider : ServeProvider, public loadingCtrl : LoadingController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberlistPage');
    this.getUsers();
  }
 

  getUsers() {

  let loadingShow = this.loadingCtrl.create({
    content: "Loading ..."
  });
    this.listviewProvider.getUsers().subscribe(data => {
      loadingShow.dismiss();
      console.log(data);
      this.users = data ; 
    }, error => {
      console.log(error);
    });
  }

  onItem(user) {
    this.navCtrl.push('DetailPage', user);
  }

}
