import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
// closes the dialog
import { MatDialogRef } from '@angular/material/dialog';
// display success / error messages to  user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @Component UserLoginFormComponent
 * This component handles user login functionality. It uses the FetchApiDataService to communicate
 * with the backend API, and MatDialogRef to close the login dialog.  It also uses MatSnackBar
 * to display success or error messages to the user.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: '../../styles.scss'
})

export class UserLoginFormComponent implements OnInit {
    
    /** Input property to receive user login data. */
    @Input() userData = { username: '', password: '' };

    /**
     * Constructor for the UserLoginFormComponent class.
     * @param fetchApiData - An instance of FetchApiDataService for API calls.
     * @param router - An instance of Router for navigation.
     * @param dialogRef - An instance of MatDialogRef to close the dialog.
     * @param snackBar - An instance of MatSnackBar to display messages.
     */
    constructor(
	public fetchApiData: FetchApiDataService,
	private router: Router,
	public dialogRef: MatDialogRef<UserLoginFormComponent>,
	/*
	  <UserLoginFormComponent>: specifies that this MatDialogRef instance is
	  specifically associated with a dialog that contains a component of type
	  UserLoginFormComponent. This is crucial for type safety.
	*/
	public snackBar: MatSnackBar) { }
    
    /**
     * ngOnInit lifecycle hook.
     */
    public ngOnInit(): void {
    }

    /**
     * Handles user login.  Makes an API call to authenticate the user and handles success/failure cases.
     */
    public loginUser(): void {

	// subscribes to the observable returned by the API call
	this.fetchApiData.userLogin(this.userData).subscribe(

	    // subscribe arg 1 of 2: callback if successful
	    (response) => {

		// step 1 of 4: route to URL which points to the MovieCardComponent
		this.router.navigate(['movies']);
		
		// step 2 of 4: add the current user and token to localStorage
		if (response.user) {
		    // persist user's login session 
		    localStorage.setItem("user", JSON.stringify(response.user));
		    localStorage.setItem("token", response.token);
		} else {
		    alert("No such user");
		}

		// step 3 of 4: close login dialog
		/*
		  MatDialogRef is an obj returned by MatDialog.open() that represents
		  an open dialog instance. It allows interaction with the open dialog.
		  e.g. closing it.
		*/
		this.dialogRef.close();

		// step 4 of 4: briefly display snackbar
		this.snackBar.open(
		    "User login successfully!", 'OK', { duration: 2000 }
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

    /**
     * Closes the login dialog.
     */
    public cancelLogin(): void {
        this.dialogRef.close();
    }

}
