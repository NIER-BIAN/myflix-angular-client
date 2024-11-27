import { Component } from '@angular/core';

/**
 * @Component AppComponent
 * This is the root component of the application.  It's the top-level component from which all other
 * components are rendered.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

/**
 * AppComponent class.  This class holds the application's root component logic and data.  Any public
 * properties are considered reactive state and will trigger a re-render of the component's view when
 * their values change.
 */
export class AppComponent {
    /*
      any properties on this class are considered a reactive state
      i.e. they are automatically tracked. Change in value of any of these properties
      triggers a re-rendering of the component's view
    */
    
    /**
     * The title of the application.  This property is reactive; changes to its value will cause
     * the component's view to re-render.
     */
    public title = 'myFlix-Angular-client'; 
}
