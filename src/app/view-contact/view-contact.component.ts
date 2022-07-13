import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: MyContact[] = [] as MyContact[];
  public errorMessage: string | null = null;
  public group: MyGroup = {} as MyGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId')
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data: MyContact[]) => {
        const dataToArray = Object.values(data);
        this.contact = dataToArray;
        this.loading = false;
        this.contactService.getGroup(dataToArray[5]).subscribe((data: MyGroup) => {
          this.group = data;
        });

      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
