import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer) {
    this.user = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');

  }
  onSendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
        
      }
    });

    let email = {
      to: this.user.email,
      cc: '',
      bcc: [],
      attachments: [],
      subject: 'Hi',
      body: 'How are you?',
      isHtml: true
    };

    this.emailComposer.open(email);
  }


}
