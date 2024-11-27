// Note that dialogs are opened in welcome-page and closed in their respective components

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

import { SingleMovieComponent } from '../single-movie/single-movie.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

/**
 * @Component MovieCardComponent
 * This component displays a list of movies, handles user authentication, and provides
 * functionality for opening dialogs and managing favorite movies.
 */
@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['../../styles.scss']
})

export class MovieCardComponent implements OnInit {
    
    /*
      any properties on this class are considered a reactive state
      i.e. they are automatically tracked. Change in value of any of these properties
      triggers a re-rendering of the component's view
    */
    
    /**
     * movies: An array to store movie data fetched from the API.
     */
    public movies: any[] = [];
    /**
     * user: Stores the currently logged-in user's information.
     */
    public user: any;
    
    /*
      less verbose but functionally identical to:
      
      constructor(fetchApiData: FetchApiDataService) {
        this.fetchApiData = fetchApiData;
      }
    */
    /**
     * Constructor injects necessary services.
     * @param fetchApiData - Service to fetch data from the API.
     * @param router - Angular's router service for navigation.
     * @param dialog - Angular Material's dialog service for opening dialogs.
     */
    constructor(
	public fetchApiData: FetchApiDataService,
	private router: Router,
	public dialog: MatDialog) {
    }
    
    /*
      ngOnInit method: method specified by the OnInit interface.
      It's an Ng hook that allows devs to add code that should run after the component has been
      created, its input properties bound, but before the component's view is rendered
      i.e. a convenient place to perform additional setup tasks after all inputs are available.
      It's accesss modifier is "public" as Ng's lifecycle system calls it internally.
    */
    /**
     * ngOnInit: Lifecycle hook that performs initial setup tasks after component creation.
     * Checks for authentication and fetches movie and user data.
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
    // main methods: note that both are needed to check all movies if they're faved
    
    /**
     * getMovies: Fetches all movies from the API and updates the `movies` array.  Uses RxJS
     * `catchError` to handle potential errors during the API call.
     */
    public getMovies(): void {
	
	this.fetchApiData.getAllMovies().subscribe((response: any) => {
	    // rename res to this.movies as view is expecting an array called "movies"
	    this.movies = response;
	});
    }
    
    /**
     * getUser: Retrieves user information from local storage and fetches detailed user data
     * from the API.  Handles potential errors using `catchError`.
     */
    public getUser(): void {
	
        const userString = localStorage.getItem('user'); 

        if (userString) {
            const user = JSON.parse(userString);
            this.fetchApiData.getOneUser(user).subscribe((response: any) => {
		this.user = response;
            });
        }
    }
    //------------------------------------------------------------------------------------
    // navbar
    
    /**
     * onLogout: Logs out the user, clears local storage, and navigates to the welcome page.
     */
    public onLogout() {
	this.router.navigate(['welcome']);
	localStorage.clear();
    }

    /**
     * onViewSource: Opens the project's GitHub repository in a new tab.
     */
    public onViewSource() {
	window.open('https://github.com/NIER-BIAN/myFlix-Angular-client', '_blank');
    }
    
    //------------------------------------------------------------------------------------
    // dialogs

    /**
     * openSingleMovieDialog: Opens a dialog displaying detailed information about a single movie.
     * @param movie - The movie data to display in the dialog.
     */
    public openSingleMovieDialog(movie: any): void {
	// The primary method of MatDialog is open()
	// which takes a component and config options as arg and returns a MatDialogRef
	this.dialog.open(
	    SingleMovieComponent,
	    {
		data: { movie: movie },
		panelClass: 'lg-dialog'
	    }
	);
    }

    /**
     * openGenreDialog: Opens a dialog displaying detailed information about a movie genre.
     * @param genre - The genre data to display in the dialog.
     */
    public openGenreDialog(genre: any): void {
	this.dialog.open(
	    GenreComponent,
	    {
		data: { genre: genre },
		panelClass: 'md-dialog'
	    }
	);
    }

    /**
     * openDirectorDialog: Opens a dialog displaying detailed information about a movie director.
     * @param director - The director's name to display in the dialog.
     */
    public openDirectorDialog(director: string): void {
	this.dialog.open(
	    DirectorComponent,
	    {
		data: { director: director },
		panelClass: 'md-dialog'
	    }
	);
    }

    //------------------------------------------------------------------------------------
    // toggleFavorite
    
    /**
     * toggleFavorite: Adds or removes a movie from the user's favorite movies list.  Uses RxJS
     * `catchError` to handle potential errors during API calls.
     * @param id - The ID of the movie to toggle.
     */
    public toggleFavorite(id: string): void {

	// add if not included
	if (!this.user.favoriteMovies.includes(id)) {

	    this.fetchApiData.addToFavorites(this.user, id).subscribe((response: any) => {
		// user with updated favorites array
		this.user = response;
		console.log("added!");
	    });
	}

	// remove if included
	else {

	    this.fetchApiData.removeFromFavorites(this.user, id).subscribe((response: any) => {
		// user with updated favorites array
		this.user = response;
		console.log("removed!");
	    });
	}
    }
}
