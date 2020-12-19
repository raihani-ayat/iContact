import { Injectable } from '@angular/core';
import {Contact} from '../shared/Contact'
import { AuthenticationService } from './authentication.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ContactService {  
contactObesrvable:Observable<any>;
contact_to_edit:Contact;
contact_to_view:Contact;

  constructor(public auth:AuthenticationService, public afStore:AngularFirestore, public db:AngularFireDatabase, public toast:ToastController) {
    this.contactObesrvable=this.afStore.collection('contacts').valueChanges();
   }

 

  getContacts(){
    this.auth.GetCurrentUser();
    return this.contactObesrvable;
  }

  writeContact(ct:Contact){
    this.auth.GetCurrentUser();
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`/contacts/`+ct.name);
    const userData:Contact ={
      uid:ct.uid,
      contact_owner_uid: ct.contact_owner_uid,
      name:ct.name,
      phone:ct.phone,
      phone_bis:ct.phone_bis,
      email:ct.email,
      instagram:ct.instagram,
      image:ct.image,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  delete(name:string){
    this.afStore.collection('contacts').doc(name).delete();
  }

  async ToastAdd(){
    const po=await this.toast.create(
      {
        message:'Ajouté avec succés',
        duration:1000,
      }
    );
    po.present();
  }
  
  async ToastDelete(){
    const po=await this.toast.create(
      {
        message:'Supprimé avec succés',
        duration:1000,
      }
    );
    po.present();
  } 
  
  
}


