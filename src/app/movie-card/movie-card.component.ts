import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {

    // movies is a list of any
    movies: any[] = [];

    /*
      less verbose but functionally identical to:
      
      constructor(fetchApiData: FetchApiDataService) {
        this.fetchApiData = fetchApiData;
      }
     */
    constructor(public fetchApiData: FetchApiDataService) { }
    
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
}
