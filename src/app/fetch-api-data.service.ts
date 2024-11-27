/**
 * FetchApiDataService: An Angular service responsible for handling communication with a backend API.
 * This service uses RxJS Observables to manage asynchronous operations and provides methods for
 * creating, reading, updating, and deleting data.
 */

//=======================================================================================
// IMPORTS

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// RxJS: Reactive Extensions for JavaScript
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// the api url that will provide data for the client app
const apiUrl = 'https://nier-myflix-backend-63a3c9fa7364.herokuapp.com';

/**
 * Injectable decorator marks this service as injectable at the root level of the application,
 * making it available throughout the application.
 */
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
      At the same time, constructor parameter "http" assigns the injected HttpClient
      instance to 'this' private property. constructor(private http: HttpClient) {} is
      the less verbose but functionally identical to:
      
      constructor(http: HttpClient) {
        this.http = http;
      }
     */
    
    constructor(private http: HttpClient) { }

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
    /**
     * userRegistration: Registers a new user with the API.  Returns an Observable that emits
     * the API response. Uses RxJS pipe to handle the response and catch errors.
     * @param userDetails - The user details to be registered.
     * @returns An Observable emitting the API response or an error.
     */
    public userRegistration(userDetails: any): Observable<any> {

	/*
	  .pipe() is a VIP RxJS func. It chains multiple RxJS operators tgt to process
	  an Observable's data stream / emissions.
	*/

	// the post method in ng's HttpClient expects at least 2 params:
	return this.http
	    .post( apiUrl + '/users',  // the URL
		   userDetails )      // the data to be sent
	    .pipe(
		// pipe expects funcs that takes an Observable and returns a transformed observable
		// apply extractResponseData to the Observable emitted by the this.http.get method
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }

    // POST: Log a user in
    /**
     * userLogin: Logs in a user with the API. Returns an Observable that emits the API response.
     * Uses RxJS pipe to handle the response and catch errors.
     * @param userDetails - The user credentials.
     * @returns An Observable emitting the API response or an error.
     */
    public userLogin(userDetails: any): Observable<any> {

	// set up correct login url: /login?username={username}&password={password}
	const username = encodeURIComponent(userDetails.username);
	const password = encodeURIComponent(userDetails.password);
	const fullLoginUrl = `/login?username=${username}&password=${password}`;

	return this.http
	    .post( apiUrl + fullLoginUrl,
		   { }                // empty obj to satisfy method's signature
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
     }
    
    //=================================================================================
    // READ

    /**
     * getAllUsers: Retrieves all users from the API. Returns an Observable that emits the API
     * response.  Includes authorization header. Uses RxJS pipe to handle the response and catch
     * errors.
     * @returns An Observable emitting the API response or an error.
     */
    // GET: Get info on all users
    public getAllUsers(): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + '/users',
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get info on a single user by username
    /**
     * getOneUser: Retrieves a single user from the API by username. Returns an Observable that
     * emits the API response. Includes authorization header. Uses RxJS pipe to handle the
     * response and catch errors.
     * @param userDetails - The username of the user to retrieve.
     * @returns An Observable emitting the API response or an error.
     */
    public getOneUser(userDetails: any): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/users/${encodeURIComponent(userDetails.username)}`,
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get a list of all movies
    /**
     * getAllMovies: Retrieves all movies from the API. Returns an Observable that emits the API
     * response. Includes authorization header. Uses RxJS pipe to handle the response and catch
     * errors.
     * @returns An Observable emitting the API response or an error.
     */
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
    /**
     * getOneMovie: Retrieves a single movie from the API by title. Returns an Observable that
     * emits the API response. Includes authorization header. Uses RxJS pipe to handle the
     * response and catch errors.
     * @param movieTitle - The title of the movie to retrieve.
     * @returns An Observable emitting the API response or an error.
     */
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
    /**
     * getGenre: Retrieves movies by genre from the API. Returns an Observable that emits the API
     * response. Includes authorization header. Uses RxJS pipe to handle the response and catch
     * errors.
     * @param genreName - The name of the genre to retrieve movies for.
     * @returns An Observable emitting the API response or an error.
     */
    public getGenre(genreName: string): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/movies/genre/${encodeURIComponent(genreName)}`,
		 {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		)
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // GET: Get data about a director by name
    /**
     * getDirector: Retrieves movies by director from the API. Returns an Observable that emits
     * the API response. Includes authorization header. Uses RxJS pipe to handle the response and
     * catch errors.
     * @param directorName - The name of the director to retrieve movies for.
     * @returns An Observable emitting the API response or an error.
     */
    public getDirector(directorName: string): Observable<any> {
	
	const token = localStorage.getItem('token');
	
	return this.http
	    .get( apiUrl + `/movies/directors/${encodeURIComponent(directorName)}`,
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
    /**
     * updateUserInfo: Updates user information in the API. Returns an Observable that emits the
     * API response. Includes authorization header. Uses RxJS pipe to handle the response and
     * catch errors.
     * @param curUsername - The current username.
     * @param userDetails - The updated user details.
     * @returns An Observable emitting the API response or an error.
     */
    public updateUserInfo(curUsername: string, userDetails: any): Observable<any> {

	const token = localStorage.getItem('token');

	// put method accepts the URL, THEN the request body, THEN the config obj (ie. headers)
	return this.http
	    .put( apiUrl + `/users/${encodeURIComponent(curUsername)}`,
		  userDetails,
		  {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // PATCH: Add a movie to a user's favorite movies
    /**
     * addToFavorites: Adds a movie to a user's favorites. Returns an Observable that emits the
     * API response. Includes authorization header. Uses RxJS pipe to handle the response and
     * catch errors.
     * @param userDetails - The user details.
     * @param movieID - The ID of the movie to add to favorites.
     * @returns An Observable emitting the API response or an error.
     */
    public addToFavorites(userDetails: any, movieID: string): Observable<any> {

	const token = localStorage.getItem('token');
	
	return this.http
	    .patch( apiUrl + `/users/${encodeURIComponent(userDetails.username)}/movies/${movieID}`,
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
    /**
     * removeFromFavorites: Removes a movie from a user's favorites. Returns an Observable that
     * emits the API response. Includes authorization header. Uses RxJS pipe to handle the
     * response and catch errors.
     * @param userDetails - The user details.
     * @param movieID - The ID of the movie to remove from favorites.
     * @returns An Observable emitting the API response or an error.
     */
    public removeFromFavorites(userDetails: any, movieID: string): Observable<any> {

	const token = localStorage.getItem('token');
	
	return this.http
	    .delete( apiUrl + `/users/${encodeURIComponent(userDetails.username)}/movies/${movieID}`,
		    {headers: new HttpHeaders( { Authorization: 'Bearer ' + token })}
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    // DELETE: Deregister a user
    /**
     * deregisterUser: Deregisters a user from the API. Returns an Observable that emits the API
     * response. Includes authorization header and sets the response type to text. Uses RxJS pipe
     * to handle the response and catch errors.
     * @param username - The username of the user to deregister.
     * @returns An Observable emitting the API response or an error.
     */
    public deregisterUser(username: string): Observable<any> {

	const token = localStorage.getItem('token');
	
	return this.http
	    .delete( apiUrl + `/users/${encodeURIComponent(username)}`,
		     {
		headers:
		new HttpHeaders( { Authorization: 'Bearer ' + token }),

		// Ng HttpClient expects JSON response by default but receiving str
		// Here we explicitly change res type
		responseType: 'text'
	    }
		 )
	    .pipe(
		map(this.extractResponseData),
		catchError(this.handleError)
	    );
    }
    
    //=================================================================================
    // MISC.

    // Key here is the || {} part which is a defensive measure against a null or undefined res
    // Note that it's not doing any meaningful data extraction
    /**
     * extractResponseData: Extracts the response data from an HTTP response.  Handles potential
     * null or undefined responses.
     * @param res - The HTTP response.
     * @returns The extracted response data.
     */
    private extractResponseData(res: Object): any {
	
	// if res is null or undefined, return {}
	return res || { };
    }

    // handleError method
    /**
     * handleError: Handles errors that occur during HTTP requests.  Provides informative error
     * messages based on whether the error is client-side or server-side.
     * @param error - The HTTP error response.
     * @returns An Observable that throws an error.
     */
    private handleError(error: HttpErrorResponse): any {

	let errorMessage = 'Unknown error!';
	
	if (error.error instanceof ErrorEvent) {
	    // Client-side error
	    errorMessage = `Error: ${error.error.message}`;
	} else {
	    // Server-side error
	    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
	}
	console.error(errorMessage)
	return throwError(() => new Error(errorMessage));
    }
    //=================================================================================
}
