import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../shared/authentication.service';
import { Contact } from '../shared/Contact';
import { ContactService } from '../shared/contact.service';
import {ImagePicker} from '@ionic-native/image-picker/ngx'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
contact:Contact={
  contact_owner_uid:'',
  uid:'',
  name:'',
  phone:'',
  phone_bis:'',
  email:'',
  instagram:'',
  image:''
};
options = {
  maximumImagesCount: 10,
  width: 800,
  height: 800,
  quality: 80
 };
  constructor(public cont:ContactService, public auth:AuthenticationService, public toast:ToastController, public picker:ImagePicker) { }

  ngOnInit() {
  }

  onChoosePicture(){
    this.picker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.contact.image=results[i];
      }
    }, (err) => {
      console.log(err);
      //this.contact.image='';
     });
  }

  onAdd(name:string,lname:string, phone1:string, phone2:string, email:string, insta:string){
    this.contact.name=name+lname;
    this.contact.phone=phone1;
    this.contact.phone_bis=phone2;
    this.contact.email=email;
    this.contact.instagram=insta;
    this.contact.contact_owner_uid=this.auth.uid;
    this.contact.image="";
    this.cont.writeContact(this.contact).then(u=>{this.onSaved()});
  }

  async onSaved(){
    const po=await this.toast.create(
      {
        message:'Enregistré avec succés',
        duration:1000,
      }
    );
    po.present();
  } 

}
