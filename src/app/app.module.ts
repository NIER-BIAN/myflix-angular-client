/*
  Note: in an Ng app, this file is the main entry point for configuring the app
  It defines and organizes the different parts of the app
  e.g. components, services, and modules, using Ng's module system.

  We have all our components and services in the root / AppModule. As the app grows
  larger this file will bloat.

  The goal is to refactor most of our components and services to their own modules,
  with the exception of the AppComponent which we still want to bootstrap from the
  root module.
*/

//=======================================================================================
// IMPORTS

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// get rid of error
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Design
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; // Navbar

// FormsModule
import { FormsModule } from '@angular/forms';

// local
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { ProfileComponent } from './profile/profile.component';

//=======================================================================================
// MODULES

@NgModule({               // decorator that defines an Angular module;
                          // takes a metadata obj as arg

    // declarations: array of all components, directives, and pipes that belong to module
    declarations: [
	AppComponent,     // the first / root component of the app
	UserRegistrationFormComponent,
	UserLoginFormComponent,
	MovieCardComponent,
	WelcomePageComponent,
	SingleMovieComponent,
	GenreComponent,
	DirectorComponent,
	ProfileComponent,
    ],

    /*
      imports: array of all Angular modules that this module depends on.
      Note that import statements (top of  file) only makes things accessible within
      this module's code on the file level. Including a module in the imports array,
      on the other hand, makes its declarations (components, directives, pipes) and
      providers (services) available to this module ***and its child modules***.
      i.e. it's a central point for declaring and making available the necessar modules
      to the entire app / throughout the app's dependency injection system. This is
      especially important for services; you declare them as providers in a module, and
      then any component in that module's hierarchy can inject and use them.
    */
    imports: [
	HttpClientModule, // allows app to send HTTP reqs to a server and handle res
	BrowserModule,    // allows app to launch and run a browser application
	AppRoutingModule,  // custom module that configures the app's routing
	BrowserAnimationsModule,
	MatInputModule,
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatDialogModule,
	MatSnackBarModule,
	MatIconModule,
	FormsModule,
	MatToolbarModule,
    ],

    /*
      providers: array of all services that are provided at the module level.
      Add services here that need to be accessible to any component in this module
      as well as any module that imports it.
    */
    providers: [],

    // bootstrap: specifies root component Ng should bootstrap when it starts the app
    bootstrap: [AppComponent]
})

//=======================================================================================
// EXPORT

export class AppModule { }
