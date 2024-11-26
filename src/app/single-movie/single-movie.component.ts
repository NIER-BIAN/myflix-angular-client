import { Component, Inject } from '@angular/core';
// extracts dialog info & closes the dialog
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: '../../styles.scss'
})

export class SingleMovieComponent {

    public movie: any;
    
    constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
	public dialogRef: MatDialogRef<SingleMovieComponent>
    ) {
	// Access the data passed from the parent component
	this.movie = this.data.movie;
    }

    //Close the dialog 
    public close(): void {
        this.dialogRef.close();
    }
    
}
