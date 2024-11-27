import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// extracts dialog info & closes the dialog
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @Component GenreComponent
 * This is a dialog component displaying detailed information about a movie genre.
 * It fetches genre data from a service and provides a mechanism to close the dialog.
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: '../../styles.scss'
})

export class GenreComponent {

    /**
     * genre: Stores the genre name received from the parent component.
     */
    public genre: any;
    
    /**
     * genreFullInfo: Stores the complete genre information fetched from the API.  Initialized as an
     * empty object to prevent potential errors.
     */
    public genreFullInfo: any; // Initialize an empty obj to store genre data.
    
    /**
     * Constructor injects necessary services and data. The `data` parameter receives data passed
     * from the component that opened the dialog. `fetchApiData` fetches genre information, and
     * `dialogRef` closes the dialog.
     * @param data - Data passed from the parent component, containing the genre's name.
     * @param fetchApiData - The service to fetch genre information.
     * @param dialogRef - The reference to the dialog, used to close it.
     */
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

    /**
     * getGenreInfo: Fetches detailed information about a genre using the `fetchApiData` service.
     * Subscribes to the observable to handle the API response. Includes error handling.
     * @param genreName - The name of the genre.
     */
    public getGenreInfo(genreName: string): void {
	this.fetchApiData.getGenre(this.genre.name).subscribe((response: any) => {
	    // rename res as per what view is expecting
	    this.genreFullInfo = response;
	});
    }

    //Close the dialog 
    /**
     * close: Closes the dialog.
     */
    public close(): void {
        this.dialogRef.close();
    }
}
