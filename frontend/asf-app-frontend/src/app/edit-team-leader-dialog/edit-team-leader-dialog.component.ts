import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentEditDTO} from "../models/Department";
import {DepartmentService} from "../services/department.service";
import {TeamLeader, TeamLeaderEditDTO} from "../models/TeamLeader";
import {TeamLeaderService} from "../services/team-leader.service";

@Component({
  selector: 'app-edit-team-leader-dialog',
  templateUrl: './edit-team-leader-dialog.component.html',
  styleUrls: ['./edit-team-leader-dialog.component.css']
})
export class EditTeamLeaderDialogComponent implements OnInit {
  teamLeaderForm!: FormGroup;
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  constructor(
    private form_builder: FormBuilder,
    private dialogRef: MatDialogRef<EditTeamLeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamLeaderEditDTO,
    private teamLeaderService: TeamLeaderService
  ) { }

  async ngOnInit() {
    console.log("DATAAA");
    console.log(this.data);
    console.log(this.data.name);
    this.teamLeaderForm = this.form_builder.group({
      name: '',
      description: '',
      picture: null
    });

    this.teamLeaderForm.patchValue(this.data);
    console.log(this.teamLeaderForm);
    if (this.data.picture) {
      this.selectedFileName = this.data.picture;
      this.teamLeaderForm.get('picture')?.setValue(this.data.picture); // Set the default value
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    event.preventDefault(); // Prevent form submission
    const file: File = event.target.files[0];
    if (file) {
      // Store the selected file
      this.selectedFile = file;
      // Display the selected file name
      this.selectedFileName = file.name;
      this.teamLeaderForm.get('picture')?.setValue(file.name);
    } else if (this.data.picture) {
      this.selectedFileName = this.data.picture;
      this.teamLeaderForm.get('picture')?.setValue(this.data.picture);
    }
  }

  cancelFileSelection(): void {
    this.selectedFile = undefined; // Clear the selected file
    this.selectedFileName = undefined; // Clear the selected file name
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = ''; // Reset the input value to clear the file selection
    }
  }

  onFormSubmit(event: Event) {
    event.preventDefault(); // Prevent form submission

    if (this.teamLeaderForm.valid) {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
      const file = fileInput?.files && fileInput.files.length > 0 ? fileInput.files[0] : null;

      console.log("Submitting form...");

      if (file) {
        console.log("Uploading new image...");

        this.teamLeaderService.editTeamLeader(this.teamLeaderForm.value, file, this.data.id)
          .then((response) => {
            console.log('Team leader edited, response:', response);
            this.dialogRef.close(response.picture);
          })
          .catch((error) => {
            console.error('Error while editing team leader:', error);
          });
      } else {
        console.log("No new image selected, sending other form data...");

        this.teamLeaderService.editTeamLeader(this.teamLeaderForm.value, null, this.data.id)
          .then((response) => {
            console.log('Team leader edited, response:', response);
            this.dialogRef.close(response.picture);
          })
          .catch((error) => {
            console.error('Error while editing team leader:', error);
          });
      }
    } else {
      console.log("Form is invalid");
    }
  }

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click(); // trigger click on the hidden file input
    }
  }


  onCancelClick(event: Event) {
    event.preventDefault();
    // Check if any changes have been made to the form
    if (this.teamLeaderForm.dirty) {
      // If changes are made, close the dialog without applying any modifications
      this.dialogRef.close();
    } else {
      // If no changes are made, simply close the dialog without altering the data
      this.dialogRef.close(this.data);
    }
  }

  removeExistingImage(): void {
    this.data.picture = ''; // Clear the picture URL from the data object
    this.selectedFileName = undefined; // Clear the selected file name
    this.selectedFile = undefined; // Clear the selected file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = ''; // Reset the input value to clear the file selection
    }
  }

}
