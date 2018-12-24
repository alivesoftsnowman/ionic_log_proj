import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ServeProvider } from '../../providers/provider/provider';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the CAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-c-account',
  templateUrl: 'c-account.html',
})
export class CAccountPage {

  firstname;
  lastname;
  email = "";
  password;
  pnumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, public webProvider: ServeProvider
    , public alertCtrl: AlertController, public loadingCtrl: LoadingController, private logstorage : Storage) {
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CAccountPage');
  }
  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
  onAddAccount() {
    if (this.firstname == "" || this.lastname == "" || this.email == "" || this, this.password == "" || this, this.pnumber == "") {
      this.showAlert('warning', "Please fill inputs");
      return;
    } else if (!this.validateEmail(this.email)) {
      this.showAlert("warning", "Please correct email format!");
      return;

    } else if (this.password.length < 6) {
      this.showAlert("warning", "Your password is very weak! Must be more than 6 letters!");
      return;
    }
    let sendData = { fname: this.firstname, lname: this.lastname, email: this.email, password: this.password, pnumber: this.pnumber }
    let loadingShow = this.loadingCtrl.create({
      content: "Loading ..."
    });

    loadingShow.present();
    this.webProvider.addAccount(sendData).subscribe(data => {
      loadingShow.dismiss();
      console.log(data);
      if (data[0].result == "success") {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.password = "";
        this.pnumber = "";
        this.logstorage.set('logged','y');
        this.navCtrl.setRoot("MemberlistPage");

      }
    }, error => {
      console.log(error);
    });
  }

}
