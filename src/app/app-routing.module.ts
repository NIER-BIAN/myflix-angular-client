// This module encapsulates the app's route configs

//=======================================================================================
// IMPORTS

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileComponent } from './profile/profile.component';

//=======================================================================================
// SET UP ROUTES

// an array of Route objects
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

@NgModule({
    imports: [RouterModule.forRoot(routes)], // registers routes array with the Ng router
    exports: [RouterModule]
})

//=======================================================================================
// EXPORT

export class AppRoutingModule { }
