import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Department, DepartmentAddDTO, DepartmentEditDTO} from "../models/Department";
import {DepartmentService} from "../services/department.service";
import {TeamLeader} from "../models/TeamLeader";
import {TeamLeaderService} from "../services/team-leader.service";

@Component({
  selector: 'app-edit-department-dialog',
  templateUrl: './edit-department-dialog.component.html',
  styleUrls: ['./edit-department-dialog.component.css']
})
export class EditDepartmentDialogComponent implements OnInit{
  departmentForm!: FormGroup;
  selectedFile: File | undefined;
  teamLeaders: TeamLeader[] | undefined = [];
  selectedFileName: string | undefined;

  constructor(
    private form_builder: FormBuilder,
    private dialogRef: MatDialogRef<EditDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepartmentEditDTO,
    private departmentService: DepartmentService,
    private teamLeaderService: TeamLeaderService
  ) { }

  async ngOnInit() {
    console.log("DATAAA");
    console.log(this.data);
    console.log(this.data.picture);
    this.departmentForm = this.form_builder.group({
      name: '',
      team_leader: null,
      description: '',
      picture: null
    });

    this.departmentForm.patchValue(this.data);
    await this.fetchTeamLeaders();
    this.setDefaultValue();
    console.log(this.departmentForm);
    if (this.data.picture) {
      this.selectedFileName = this.data.picture;
      this.departmentForm.get('picture')?.setValue(this.data.picture); // Set the default value
    }
  }

  setDefaultValue() {
    const defaultLeader = this.teamLeaders?.find(leader => leader.id === this.data.team_leader?.id);

    if (defaultLeader) {
      this.departmentForm.get('team_leader')?.setValue(defaultLeader.id);
    }
  }

  async fetchTeamLeaders() {
    try {
      // Fetch team leaders from a service method and convert the Observable to a Promise
      this.teamLeaders = await this.teamLeaderService.getAllTeamLeaders().toPromise();
    } catch (error) {
      console.error('Error while fetching team leaders:', error);
      // Handle error if needed
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
      this.departmentForm.get('picture')?.setValue(file.name);
    } else if (this.data.picture) {
      this.selectedFileName = this.data.picture;
      this.departmentForm.get('picture')?.setValue(this.data.picture);
    }
  }


  // Function to remove the selected file
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

    if (this.departmentForm.valid) {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
      const file = fileInput?.files && fileInput.files.length > 0 ? fileInput.files[0] : null;

      console.log("Submitting form...");

      if (file) {
        console.log("Uploading new image...");

        this.departmentService.editDepartment(this.departmentForm.value, file, this.data.id)
          .then((response) => {
            console.log('Department edited, response:', response);
            this.dialogRef.close(response.picture);
          })
          .catch((error) => {
            console.error('Error while editing department:', error);
          });
      } else {
        console.log("No new image selected, sending other form data...");

        this.departmentService.editDepartment(this.departmentForm.value, null, this.data.id)
          .then((response) => {
            console.log('Department edited, response:', response);
            this.dialogRef.close(response.picture);
          })
          .catch((error) => {
            console.error('Error while editing department:', error);
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
    if (this.departmentForm.dirty) {
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
