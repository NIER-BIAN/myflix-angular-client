// This module encapsulates the app's route configs

/**
 * This module defines the routing configuration for the application.  It uses Angular's `RouterModule`
 * to define routes that map URLs to components.
 */

//=======================================================================================
// IMPORTS

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileComponent } from './profile/profile.component';

//=======================================================================================
// SET UP ROUTES


/**
 * An array of Route objects defining the application's routes.  Each route object maps a URL path
 * to a component.  The empty path ('') redirects to the 'welcome' route.
 */
const routes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: 'profile', component: ProfileComponent },
    // pathMatch: 'prefix': any URL starting with '/' will trigger this redirect.
    // If it were pathMatch: 'full', only the exact URL '/'
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

//=======================================================================================
// MODULES


/**
 * NgModule declaration for AppRoutingModule.  It imports `RouterModule.forRoot(routes)` to register
 * the defined routes with the Angular router and exports `RouterModule` to make it available to other modules.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)], // registers routes array with the Ng router
    exports: [RouterModule]
})

//=======================================================================================
// EXPORT

/**
 * The AppRoutingModule class.  This is a standard export for an Angular module.
 */
export class AppRoutingModule { }
