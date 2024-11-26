import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// closes the dialog
import { MatDialogRef } from '@angular/material/dialog';
// display success / error messages to  user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['../../styles.scss']
})

/*
  The OnInit interface
  Interfaces define a contract / specify that class must implement certain methods.
  It's purupose is to ensure code consistency and predictability.
  The OnInit interface has only one method: ngOnInit().
  When a class implements OnInit, it's promising to provide a definition for the ngOnInit() method.
  Ng's component lifecycle system will automatically call the ngOnInit() method at the appropriate time
  in the component's lifecycle, after the component has been created and its input properties bound,
  but before the component's view is rendered.

  Think of it like this:
  
  Interface: A blueprint or contract.
  i.e. "If you're going to be this type of thing, you must have these parts."

  Class: A concrete implementation.
  i.e. "I am this type of thing, and here are the parts defined in the blueprint."
*/

export class UserRegistrationFormComponent implements OnInit {

    // define an input property named userData
    @Input() userData = { username: '', password: '' };

    // Inject necessary services
    // Ng's dependency injection system provides these instances
    constructor(
	public fetchApiData: FetchApiDataService,
	public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
	/*
	  <UserRegistrationFormComponent>: specifies that this MatDialogRef instance is
	  specifically associated with a dialog that contains a component of type
	  UserRegistrationFormComponent. This is crucial for type safety
	*/
	public snackBar: MatSnackBar) {
    }

    /*
      ngOnInit method: method specified by the OnInit interface.
      It's an Ng hook that allows devs to add code that should run after the component has been
      created, its input properties bound, but before the component's view is rendered
      i.e. a convenient place to perform additional setup tasks after all inputs are available.
      It's accesss modifier is "public" as Ng's lifecycle system calls it internally.
    */
    public ngOnInit(): void {
    }
    /* WHY IS IT EMPTY?

       Always including ngOnInit (even if empty) as a placeholder is common pratice.
       Although it adds no immediate functionality, it'sa demonstration of good coding style.
     */

    public registerUser(): void {

	// subscribes to the observable returned by the API call
	this.fetchApiData.userRegistration(this.userData).subscribe(

	    // subscribe arg 1 of 2: callback if successful
	    (response) => {

		// step 1 of 2: close registration dialog
		/*
		  MatDialogRef is an obj returned by MatDialog.open() that represents
		  an open dialog instance. It allows interaction with the open dialog.
		  e.g. closing it.
		*/
		this.dialogRef.close();

		// step 4 of 4: briefly display snackbar
		this.snackBar.open(
		    "User registered successfully!", 'OK', { duration: 2000 }
		);
	    },

	    // subscribe arg 2 of 2: callback if error
	    (response) => {
		this.snackBar.open(
		    response, 'OK', { duration: 2000 }
		);
	    }
	);
    }
    
    //Close the dialog 
    public cancelRegistration(): void {
        this.dialogRef.close();
    }
}
