import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  public getAllContacts(): Observable<MyContact[]> {
    let dataUrl: string = `${this.apiUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // get single data
  public getContact(contactId: string): Observable<MyContact[]> {
    let dataUrl: string = `${this.apiUrl}/contacts/${contactId}`;

    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // add new contact
  public createContact(contact: MyContact): Observable<MyContact[]> {
    let dataUrl: string = `${this.apiUrl}/contacts`;
    return this.http.post<MyContact[]>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // update contact
  public updateContact(contact: MyContact[], contactId: String): Observable<MyContact[]> {
    let dataUrl: string = `${this.apiUrl}/contacts/${contactId}`;
    return this.http.put<MyContact[]>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // delete contact
  public deleteContact(contactId: String): Observable<MyContact[]> {
    let dataUrl: string = `${this.apiUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // get all groups
  public getAllGroups(): Observable<MyGroup[]> {
    let dataUrl: string = `${this.apiUrl}/groups`;
    return this.http.get<MyGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // get single group
  public getGroup(contact: MyContact): Observable<MyGroup> {
    let dataUrl: string = `${this.apiUrl}/groups/${contact}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
  }


  // error handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
