import { Component, Inject } from '@angular/core';
// extracts dialog info & closes the dialog
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @Component SingleMovieComponent
 * This component displays details for a single movie in a dialog box.  It receives movie data
 * as input and provides a mechanism to close the dialog.
 */
@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: '../../styles.scss'
})

export class SingleMovieComponent {

    /** The movie data to be displayed. */
    public movie: any;
    
    /**
     * Constructor for the SingleMovieComponent class.
     * @param data - The movie data injected via MAT_DIALOG_DATA.
     * @param dialogRef - The MatDialogRef used to close the dialog.
     */
    constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
	public dialogRef: MatDialogRef<SingleMovieComponent>
    ) {
	// Access the data passed from the parent component
	this.movie = this.data.movie;
    }

    /**
     * Closes the dialog.
     */
    public close(): void {
        this.dialogRef.close();
    }
    
}
