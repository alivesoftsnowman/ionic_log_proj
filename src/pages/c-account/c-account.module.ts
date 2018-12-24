import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CAccountPage } from './c-account';

@NgModule({
  declarations: [
    CAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CAccountPage),
  ],
})
export class CAccountPageModule {}
