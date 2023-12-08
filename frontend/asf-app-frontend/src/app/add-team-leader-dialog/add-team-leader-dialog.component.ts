import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamLeaderAddDTO} from "../models/TeamLeader";
import {TeamLeaderService} from "../services/team-leader.service";


@Component({
  selector: 'app-add-team-leader-dialog',
  templateUrl: './add-team-leader-dialog.component.html',
  styleUrls: ['./add-team-leader-dialog.component.css']
})
export class AddTeamLeaderDialogComponent {
  teamLeaderForm!: FormGroup;
  selectedFile: File | undefined;

  constructor(
    private form_builder: FormBuilder,
    private dialogRef: MatDialogRef<AddTeamLeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamLeaderAddDTO,
    private teamLeaderService: TeamLeaderService
  ) { }

  ngOnInit() {
    this.teamLeaderForm = this.form_builder.group({
      name: '',
      description: ''
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    event.preventDefault(); // Prevent form submission
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log('Selected file:', this.selectedFile.name);
    }
  }

  cancelFileSelection(): void {
    this.selectedFile = undefined;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = ''; // Clear the input value
    }
  }

  onFormSubmit(event: Event) {
    event.preventDefault(); // Prevent form submission
    if (this.teamLeaderForm.valid) {
      if (this.selectedFile) {
        this.teamLeaderService.addTeamLeader(this.teamLeaderForm.value, this.selectedFile)
          .then((response) => {
            console.log('Team Leader added here is the response', response);
            this.dialogRef.close(response.picture);
          })
          .catch((error) => {
            console.error('Error while adding team leader:', error);
          });
      } else {
        this.dialogRef.close(this.teamLeaderForm.value);
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

  // Add a method to prevent form submission when cancel is clicked
  onCancelClick(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.dialogRef.close(); // Close the dialog without submitting
  }
}
