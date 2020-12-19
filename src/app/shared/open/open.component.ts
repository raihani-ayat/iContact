import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from '../Contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss'],
})
export class OpenComponent implements OnInit {
public contact:Contact;
  constructor(public mod:ModalController, public con:ContactService) {
    this.contact=this.con.contact_to_view;
   }

  ngOnInit() {}

 onDismiss(){
  this.mod.dismiss();
 }

}
