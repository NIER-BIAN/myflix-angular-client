import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// extracts dialog info & closes the dialog
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: '../../styles.scss'
})

export class GenreComponent {

    public genre: any;
    public genreFullInfo: any; // Initialize an empty obj to store genre data.
    
    constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
	public fetchApiData: FetchApiDataService,
	public dialogRef: MatDialogRef<GenreComponent>
    ) {
	// Access the data passed from the parent component
	this.genre = this.data.genre;
	// Fetch data straight away
	this.getGenreInfo(this.genre.name)
    }

    public getGenreInfo(genreName: string): void {
	this.fetchApiData.getGenre(this.genre.name).subscribe((response: any) => {
	    // rename res as per what view is expecting
	    this.genreFullInfo = response;
	});
    }

    //Close the dialog 
    public close(): void {
        this.dialogRef.close();
    }
}
