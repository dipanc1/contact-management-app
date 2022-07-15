import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: MyContact[] = [] as MyContact[];
  public errorMessage: string | null = null;
  public group: MyGroup[] = [] as MyGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((
        data: MyContact[]
      ) => {
        const dataToArray = Object.values(data);
        this.contact = dataToArray;
        this.loading = false;
        this.contactService.getAllGroups().subscribe((data: MyGroup[]) => {
          this.group = data;
        })
      }, error => {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  public submitUpdate() {
    if (this.contactId) {
      this.contactService.updateContact(
        this.contact, this.contactId
      ).subscribe((data: MyContact[]) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      })
    }
  }

}
