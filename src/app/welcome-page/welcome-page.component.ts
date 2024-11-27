// Note that dialogs are opened in welcome-page and closed in their respective components

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

/**
 * @Component WelcomePageComponent
 * This component displays the welcome page and provides buttons to open the user login and registration dialogs.
 */
@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['../../styles.scss']
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
    /**
     * Constructor for the WelcomePageComponent class.
     * @param dialog - An instance of MatDialog to open dialogs.
     */
    constructor(public dialog: MatDialog) {
    }
    
    /**
     * ngOnInit lifecycle hook.
     */
    ngOnInit(): void {
    }
    
    /**
     * Opens the user registration dialog.
     */
    public openUserRegistrationDialog(): void {
	// The primary method of MatDialog is open()
	// which takes a component and config options as arg and returns a MatDialogRef
	this.dialog.open(
	    UserRegistrationFormComponent,
	    { panelClass: 'sm-dialog' }
	);
    }
    
    /**
     * Opens the user login dialog.
     */
    public openUserLoginDialog(): void {
	this.dialog.open(
	    UserLoginFormComponent,
	    { panelClass: 'sm-dialog' }
	);
    }
}
