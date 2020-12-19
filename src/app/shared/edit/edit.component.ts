import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from '../Contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
public contact:Contact;
  constructor(public cont:ContactService, public mod:ModalController) { 
    this.contact=this.cont.contact_to_edit;
  }

  ngOnInit() {}
  onDismiss(){
    this.mod.dismiss();
   }
   onUpdate(name:string, phone:string, phone2:string, email:string, insta:string){
     this.contact.name=name;
     this.contact.phone=phone;
     this.contact.phone_bis=phone2;
     this.contact.email=email;
     this.contact.instagram=insta;
     this.cont.writeContact(this.contact);
   }

}
