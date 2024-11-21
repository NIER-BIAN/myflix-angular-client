// fetch-api-data.service.ts is an Ng service that handles communication with an API

//=======================================================================================
// IMPORTS

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// RxJS: Reactive Extensions for JavaScript
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// the api url that will provide data for the client app
const apiUrl = 'nier-myflix-backend-63a3c9fa7364.herokuapp.com';

// decorator marks the service as injectable at the root level of the application
// i.e. this service will be available everywhere
@Injectable({
    providedIn: 'root'
})

export class FetchApiDataService {

    /*
      add HttpClient class to its constructor to use its state and logic
      i.e. this service needs needs an instance of HttpClient
      Ng's dep injection system will automatically provide this instance
    */
    /*
      Note the access modifier makes http a private property of the service.
      At the same time, constructor parameter "http" assigns the injected HttpClien
      instance to 'this' private property. constructor(private http: HttpClient) {} is
      more verbose but functionally identical to:
      
      constructor(http: HttpClient) {
        this.http = http;
      }
     */
    
    constructor(private http: HttpClient) {

    }

    //=================================================================================
    // CREATE

    /*
      An Observable is a VIP RxJS (Reactive Extensions for JS) concept representing a
      stream of data over time. It's promises but enhanced: a promise handles a single
      asynch event and resolve once with a value or gets rejected once with an error.
      An observable can handle multiple asynch events over time and can emit multiple vals
      You can subscribe to them to receive these values as they become available.
    */

    // POST: Create a new user
    // Tell the TS compiler that the func returns an Observable that emits val of type any.
    public userRegistration(userDetails: any): Observable<any> {

	/*
	  .pipe() is a VIP RxJS func. It chains multiple RxJS operators tgt to process
	  an Observable's data stream / emissions.
	*/

	// the post method in ng's HttpClient expects at least 2 params:
	return this.http
	    .post( apiUrl + '/users',  // the URL
		   userDetails )      // the data to be sent
	    .pipe( catchError(this.handleError) );
    }

    // POST: Log a user in
    public userLogin(userDetails: any): Observable<any> {

	// set up correct login url: /login?username={username}&password={password}
	const username = encodeURIComponen(userDetails.username);
	const password = encodeURIComponen(userDetails.password);
	const fullLoginUrl = `/login?username=${username}&password=${password}`;

	return this.http
	    .post( apiUrl + fullLoginUrl,
		   { }                // empty obj to satisfy method's signature
		 )
	    .pipe( catchError(this.handleError) );
     }
    
    //=================================================================================
    // READ

    // GET: Get info on all users
    public getAllUsers(): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + '/users',
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		// apply extractResponseData to the Observable emitted by the this.http.get method
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get info on a single user by username
    public getOneUser(userDetails: any): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/users/${encodeURIComponen(userDetails.username)}`,
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get a list of all movies
    public getAllMovies(): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + '/movies',
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }

    // GET: Get data about a single movie by title
    public getOneMovie(movieTitle: string): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/movies/${encodeURIComponent(movieTitle)}`,
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get data about a genre by name
    public getGenre(genreName: string): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/movies/genres/${encodeURIComponent(genreName)}`,
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get data about a director by name
    public getDirector(directorName: string): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/movies/genres/${encodeURIComponent(directorName)}`,
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    //=================================================================================
    // UPDATE

    // PUT: Update user information
    public updateUserInfo(userDetails: any): Observable<any> {

	const token = localStorage.getItem('token');

	// put method accepts the URL, THEN the request body, THEN the config obj (ie. headers)
	return this.http
	    .put( apiUrl + `/users/${encodeURIComponen(userDetails.username)}`,
		  userDetails,
		  {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // PATCH: Add a movie to a user's favorite movies
    public addToFavorites(userDetails: any, movieID: string): Observable<any> {

	const token = localStorage.getItem('token');
	
	return this.http
	    .patch( apiUrl + `/users/${encodeURIComponen(userDetails.username)}/movies/${movieID}`,
		    {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    //=================================================================================
    // DELETE

    // DELETE: Remove a movie from a user's favorite movies
    public removeFromFavorites(userDetails: any, movieID: string): Observable<any> {

	const token = localStorage.getItem('token');
	
	return this.http
	    .delete( apiUrl + `/users/${encodeURIComponen(userDetails.username)}/movies/${movieID}`,
		    {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // DELETE: Deregister a user
    public deregisterUser(userDetails: any): Observable<any> {

	const token = localStorage.getItem('token');
	
	return this.http
	    .delete( apiUrl + `/users/${encodeURIComponen(userDetails.username)}`,
		    {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		 )
	    .pipe(
		catchError(this.handleError)
	    );
    }
    
    //=================================================================================
    // MISC.

    // Key here is the || {} part which is a defensive measure against a null or undefined res
    // but it's not doing any meaningful data extraction
    private extractResponseData(res: Response): any {
	// if res is null or undefined, return {}
	return res || { };
    }

    // handleError method
    private handleError(error: HttpErrorResponse): any {

	if (error.error instanceof ErrorEvent) {
	    console.error('Some error occurred:', error.error.message);
	} else {
	    console.error(
		`Error Status code ${error.status}, ` +
		    `Error body is: ${error.error}`);
	}

	return throwError(
	    'Something bad happened; please try again later.');
    }
    //=================================================================================
}