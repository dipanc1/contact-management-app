import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public errorMessage: string | null = null;
  public groups: MyGroup[] = [] as MyGroup[];
  public length: number = 0;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data: MyGroup[]) => {
      this.groups = data;
    }, (error) => {
      this.errorMessage = error;
    });
  }

}
