import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { ServeProvider } from '../../providers/provider/provider';
import { GlobalData } from '../../utils/globalData';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userEmail = "";
  userPwd = "";

  constructor(public navCtrl: NavController, public httpProvider: ServeProvider, 
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private logstorage : Storage) {
      this.isloggedIn();

  }

  isloggedIn(){
    this.logstorage.get('logged').then((val)=>{
      console.log('is logged '+ val);
      if(val=='y')
        this.navCtrl.push("MemberlistPage");
    })
  }
  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
  login() {
    if (!this.validateEmail(this.userEmail)) {
      this.showAlert('WARNING', 'Invalid Email');
      return;
    }
    if (this.userPwd.length < 6) {
      this.showAlert('WARNING', 'Password must be over 6 letters!');
      return;
    }

    let loadingShow = this.loadingCtrl.create({
      content: "Loading ..."
    });

    loadingShow.present();
    let sendData = { email: this.userEmail, password: this.userPwd };
    this.httpProvider.login(sendData).subscribe(data => {
      loadingShow.dismiss();
      console.log(data);
      switch (data[0].result) {
        case 'success':
          console.log(data[1].datas[0].password);
          if (data[1].datas[0].password == this.userPwd) {
            GlobalData.myaccountemail = this.userEmail;
            GlobalData.myaccountpassword = this.userPwd;
            this.logstorage.set('logged','y');
            this.navCtrl.setRoot("MemberlistPage");
          }
          else {
            this.showAlert('Failed', "Wrong Password");
          }
          break;
        case 'wrong email name':
          this.showAlert('Login Failed', 'wrong email name');
          console.log('wrong email name');
          break;
        case 'wrong password':
          this.showAlert('Login Failed', 'wrong password');
          console.log('wrong password');
          break;
        default:
          this.showAlert('Failed', "Wrong Password");
      }
    }, error => {
      console.log(error);
    });


    //this.navCtrl.push("CAccountPage");
    // this.navProvider.http();
  }

  CreateAccount() {
    this.navCtrl.push("CAccountPage");
  };
}
