import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import {OpenComponent} from '../shared/open/open.component' 
import {EditComponent} from '../shared/edit/edit.component' 
import { AuthenticationService } from '../shared/authentication.service';
import { Contact } from '../shared/Contact';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
my_contacts:Contact[]=[];
all_contacts:any;
current_user_uid:string;
NoPicture:boolean=false;
NoContact:boolean=false;

  constructor( public ctct:ContactService, public auth:AuthenticationService, public ngFireAuth:AngularFireAuth, public mod:ModalController) { }

  ngOnInit() {
    this.auth.GetCurrentUser();
    this.getContacts();

  }

  getContacts() {
    this.auth.GetCurrentUser();
    this.ngFireAuth.authState.subscribe(user=>{
      if(user){
        this.current_user_uid=user.uid;
        this.ctct.getContacts().subscribe(u=>{
         this.all_contacts=u;
         console.log(u);
         console.log(this.all_contacts);
         this.all_contacts.forEach(element => {
          if(element.contact_owner_uid==this.current_user_uid){
            this.my_contacts.push(element);
            console.log(element);
            if(element.image==""){
              this.NoPicture=true;
            }
          }
         });


        });
      }
    })
  }

  

  onOpen(uid:string){
    this.auth.GetCurrentUser();
    this.ngFireAuth.authState.subscribe(user=>{
      if(user){
        this.current_user_uid=user.uid;
        this.ctct.getContacts().subscribe(u=>{
          this.all_contacts=u;
          this.all_contacts.forEach((element)=>{
            if(element.uid==uid){
              this.ctct.contact_to_view=element;
            }
          }
          )
        })
      }
    })
    this.mod.create({component:OpenComponent}).then(modEl=>{
      modEl.onDidDismiss().then(modalData=>{
        if(!modalData){
          return;
        }})
        modEl.present();
      
      }
        
        )
  }
  onEdit(uid:string){
    this.auth.GetCurrentUser();
    this.ngFireAuth.authState.subscribe(user=>{
      if(user){
        this.current_user_uid=user.uid;
        this.ctct.getContacts().subscribe(u=>{
          this.all_contacts=u;
          this.all_contacts.forEach((element)=>{
            if(element.uid==uid){
              this.ctct.contact_to_edit=element;
            }
          }
          )
        })
      }
    })
    this.mod.create({component:EditComponent}).then(modEl=>{
      modEl.onDidDismiss().then(modalData=>{
        if(!modalData){
          return;
        }})
        modEl.present();
      
      }
        
        )
  }
  onDelete(name:string){
    this.auth.GetCurrentUser();
    this.ngFireAuth.authState.subscribe(user=>{
      if(user){
        this.current_user_uid=user.uid;
        this.ctct.getContacts().subscribe(u=>{
          this.all_contacts=u;
          this.all_contacts.forEach((element)=>{
            if(element.name==name){
              this.ctct.delete(name);
            }
          }
          )
        })
      }
    })

  }



}
