// Note that dialogs are opened in welcome-page and closed in their respective components

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
    
    /*
      add MatDialog class to its constructor to use its state and logic
      i.e. this service needs needs an instance of MatDialog
      Ng's dep injection system will automatically provide this instance
    */
    /*
      less verbose but functionally identical to:
      
      constructor(dialog: MatDialog) {
        this.dialog = dialog;
      }
    */
    constructor(public dialog: MatDialog) {
    }
    
    ngOnInit(): void {
    }
    
    // open the dialog when the signup button is clicked  
    public openUserRegistrationDialog(): void {

	// The primary method of MatDialog is open()
	// which takes a component and config options as arg and returns a MatDialogRef
	this.dialog.open(
	    UserRegistrationFormComponent,
	    { width: '280px' }
	);
    }

     // open the dialog when the login button is clicked  
    public openUserLoginDialog(): void {
	// The primary method of MatDialog is open()
	// which takes a component and config options as arg and returns a MatDialogRef
	this.dialog.open(
	    UserLoginFormComponent,
	    { width: '280px' }
	);
    }
}
