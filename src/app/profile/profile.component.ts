import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// display success / error messages to  user
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * @Component ProfileComponent
 * This component handles the user profile page, allowing users to view their information,
 * update their profile, and deregister their account.  It uses the FetchApiDataService
 * to interact with the backend API.
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: '../../styles.scss'
})

export class ProfileComponent implements OnInit {
    
    /** Array of movies fetched from the API. */
    public movies: any[] = [];
    /** Array of user's favorite movies, formatted with titles instead of IDs. */
    public user: any;
    /** Array of user's favorite movies, formatted with titles instead of IDs. */
    public readableFaveMovies: any[] = [];
    
    // define an input property named userData
    /** Input property to receive user data for updates. */
    @Input() userData = { username: '', password: '' };
    
    /**
     * Constructor for the ProfileComponent class.
     * @param fetchApiData - An instance of FetchApiDataService used for API calls.
     * @param router - An instance of Router used for navigation.
     * @param snackBar - An instance of MatSnackBar used for displaying messages.
     */
    constructor(
	public fetchApiData: FetchApiDataService,
	private router: Router,
	public snackBar: MatSnackBar) {
    }
    
    //------------------------------------------------------------------------------------
    // ngOnInit
    
    /**
     * ngOnInit lifecycle hook.  Performs authentication check and fetches movie and user data.
     */
    public ngOnInit(): void {
	
	// Simple authentication check
	const token = localStorage.getItem('token');
	
	if (!token) {
	    this.router.navigate(['/welcome']);
	}
	
	// Fire the main method straight away
	this.getMovies();
	this.getUser();
    }

    //------------------------------------------------------------------------------------
    // main methods: note that both are needed to render faved movies as titles and not ids
    
    /**
     * Fetches all movies from the API.
     */
    public getMovies(): void {
	
	this.fetchApiData.getAllMovies().subscribe((response: any) => {
	    // rename res to this.movies as view is expecting an array called "movies"
	    this.movies = response;
	});
    }
    
    /**
     * Fetches user data from the API and filters the movies array to show only the user's favorites.
     */
    public getUser(): void {
	
        const userString = localStorage.getItem('user'); 

        if (userString) {
            const user = JSON.parse(userString);
            this.fetchApiData.getOneUser(user).subscribe((response: any) => {
		this.user = response;
		this.readableFaveMovies = this.movies.filter(
		    movie => this.user.favoriteMovies.includes(movie._id)
		);
            });
        }
    }

    //------------------------------------------------------------------------------------
    // update & deregister

    /**
     * Updates the user's information using the data provided in the userData input property.
     */
    public updateUser(): void {

	// fetch current username from localStorage
        const userString = localStorage.getItem('user'); 
	
        if (userString) {
            const curUsername = JSON.parse(userString).username;
	    this.fetchApiData.updateUserInfo(curUsername, this.userData).subscribe((response: any) => {
		
		this.snackBar.open(
		    "User updated! You have been logged out.", 'OK', { duration: 4000 }
		);
		
		this.router.navigate(['welcome']);
		localStorage.clear();
	    });
	}
    }
    
    /**
     * Deregisters the user, deleting their account.
     */
    public deregisterUser(): void {

	// fetch current username from localStorage
        const userString = localStorage.getItem('user'); 
	
        if (userString) {
            const username = JSON.parse(userString).username;
	    this.fetchApiData.deregisterUser(username).subscribe((response: any) => {

		this.snackBar.open(
		    "User deleted! You have been logged out.", 'OK', { duration: 4000 }
		);
		
		this.router.navigate(['welcome']);
		localStorage.clear();
	    });
	}
    }
    
    //------------------------------------------------------------------------------------
    // navbar
    
    /**
     * Handles user logout, clearing local storage and redirecting to the welcome page.
     */
    public onLogout() {
	this.router.navigate(['welcome']);
	localStorage.clear();
    }

    /**
     * Opens the project's GitHub repository in a new tab.
     */
    public onViewSource() {
	window.open('https://github.com/NIER-BIAN/myFlix-Angular-client', '_blank');
    }
}
