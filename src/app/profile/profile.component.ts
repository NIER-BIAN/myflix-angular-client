import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// display success / error messages to  user
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: '../../styles.scss'
})

export class ProfileComponent implements OnInit {

    public movies: any[] = [];
    public user: any;
   
    public readableFaveMovies: any[] = [];
    
    // define an input property named userData
    @Input() userData = { username: '', password: '' };
    
    constructor(
	public fetchApiData: FetchApiDataService,
	private router: Router,
	public snackBar: MatSnackBar) {
    }
    
    //------------------------------------------------------------------------------------
    // ngOnInit
    
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
    // main methods
    
    public getMovies(): void {
	
	this.fetchApiData.getAllMovies().subscribe((response: any) => {
	    // rename res to this.movies as view is expecting an array called "movies"
	    this.movies = response;
	});
    }
    
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
    
    public deregisterUser(): void {

	// fetch current username from localStorage
        const userString = localStorage.getItem('user'); 
	
        if (userString) {
            const username = JSON.parse(userString).username;
	    this.fetchApiData.deregisterUser(username).subscribe((response: any) => {

		console.log("HIIII");
		
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
    
    public onLogout() {
	this.router.navigate(['welcome']);
	localStorage.clear();
    }

    public onViewSource() {
	window.open('https://github.com/NIER-BIAN/myFlix-Angular-client', '_blank');
    }
}
