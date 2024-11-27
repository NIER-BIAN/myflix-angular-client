/**
 * This file bootstraps the Angular application. It imports the `AppModule` and uses the
 * `platformBrowserDynamic` function from `@angular/platform-browser-dynamic` to bootstrap the
 * application.  The `ngZoneEventCoalescing` option is set to `true` to improve performance by
 * coalescing events within the Angular zone.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


/**
 * Bootstraps the application using the AppModule.  Error handling is included to catch and log any errors
 * that occur during bootstrapping.
 */
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
