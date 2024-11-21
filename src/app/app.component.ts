import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    // any properties on this class are considered a reactive state
    // component will re-render UI when states change
    
    title = 'myFlix-Angular-client';
}
