import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// extracts dialog info & closes the dialog
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @Component DirectorComponent
 * This is a dialog component that displays detailed information about a movie director.
 * This component fetches director data from a service and provides a mechanism to close the dialog.
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: '../../styles.scss'
})
export class DirectorComponent {

    /**
     * director: Stores the director's name received from the parent component.
     */
    public director: any;

    /**
     * directorFullInfo: Stores the complete director information fetched from the API.
     */
    public directorFullInfo: any; // Initialize an empty obj to store director data.
    
    /**
     * Constructor injects necessary services and data.  The `data` parameter receives data
     * passed from the component that opened the dialog.  The `fetchApiData` service is used to
     * fetch director information, and `dialogRef` is used to close the dialog.
     * @param data - Data passed from the parent component, containing the director's name.
     * @param fetchApiData - The service to fetch director information.
     * @param dialogRef - The reference to the dialog, used to close it.
     */
    constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
	public fetchApiData: FetchApiDataService,
	public dialogRef: MatDialogRef<DirectorComponent>
    ) {
	// Access the data passed from the parent component
	this.director = this.data.director;
	// Fetch data straight away
	this.getDirectorInfo(this.director.name)
    }
    
    /**
     * getDirectorInfo: Fetches detailed information about a director using the `fetchApiData`
     * service.  Subscribes to the observable returned by the service to handle the API response.
     * @param directorName - The name of the director.
     */
    public getDirectorInfo(directorName: string): void {
	this.fetchApiData.getDirector(this.director.name).subscribe((response: any) => {
	    // rename res as per what view is expecting
	    this.directorFullInfo = response;
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
