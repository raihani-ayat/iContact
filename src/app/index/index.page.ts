import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/contact.service';
import {Contact} from '../shared/Contact'
import { AuthenticationService } from '../shared/authentication.service';
import {AlertController} from '@ionic/angular'


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(public cts:ContactService, public auth: AuthenticationService , public alert: AlertController) { }

  ngOnInit() {
  }
  async onSignOut(){
    const alert= await this.alert.create({
      header:'Confirmation',
      message:'Etes vous sure de vouloir se déconnecter?',
      buttons:[
        {
          text:'Oui',
          handler:()=>{
            this.auth.SignOut();
          }
        },
        {
          text:'Non',
          role:'cancel',
        }
      ]
    });
    await alert.present();
  }

}
