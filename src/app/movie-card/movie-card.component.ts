// Note that dialogs are opened in welcome-page and closed in their respective components

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

import { SingleMovieComponent } from '../single-movie/single-movie.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['../../styles.scss']
})

export class MovieCardComponent {
    
    /*
      any properties on this class are considered a reactive state
      i.e. they are automatically tracked. Change in value of any of these properties
      triggers a re-rendering of the component's view
    */
    // movies is a list of any
    movies: any[] = [];

    /*
      less verbose but functionally identical to:
      
      constructor(fetchApiData: FetchApiDataService) {
        this.fetchApiData = fetchApiData;
      }
     */
    constructor(
	public fetchApiData: FetchApiDataService,
	public dialog: MatDialog) {
    }
    
    /*
      ngOnInit method: method specified by the OnInit interface.
      It's an Ng hook that allows devs to add code that should run after the component has been
      created, its input properties bound, but before the component's view is rendered
      i.e. a convenient place to perform additional setup tasks after all inputs are available.
      It's accesss modifier is "public" as Ng's lifecycle system calls it internally.
    */
    public ngOnInit(): void {
	// Fire the main method straight away
	this.getMovies();
    }

    public getMovies(): void {
	
	this.fetchApiData.getAllMovies().subscribe((response: any) => {
	    // rename res to this.movies as view is expecting an array called "movies"
	    this.movies = response;
	    return this.movies;
	});
    }
    
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
    
    public openGenreDialog(genre: any): void {
	this.dialog.open(
	    GenreComponent,
	    {
		data: { genre: genre },
		panelClass: 'md-dialog'
	    }
	);
    }
    
    public openDirectorDialog(director: string): void {
	this.dialog.open(
	    DirectorComponent,
	    {
		data: { director: director },
		panelClass: 'md-dialog'
	    }
	);
    }
}
