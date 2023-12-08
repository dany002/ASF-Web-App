import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DepartmentAddDTO } from "../models/Department";
import { DepartmentService } from "../services/department.service";
import {TeamLeader} from "../models/TeamLeader";
import {TeamLeaderService} from "../services/team-leader.service";

@Component({
  selector: 'app-add-department-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.css']
})
export class AddDepartmentDialogComponent implements OnInit {
  departmentForm!: FormGroup;
  selectedFile: File | undefined;
  teamLeaders: TeamLeader[] = [];
  constructor(
    private form_builder: FormBuilder,
    private dialogRef: MatDialogRef<AddDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepartmentAddDTO,
    private departmentService: DepartmentService,
    private teamLeaderService: TeamLeaderService
  ) { }

  ngOnInit() {
    this.departmentForm = this.form_builder.group({
      name: '',
      description: '',
      team_leader: null
    });
    this.fetchTeamLeaders();
  }

  fetchTeamLeaders() {
    // Call the service to fetch team leaders and assign to this.teamLeaders
    this.teamLeaderService.getAllTeamLeaders().subscribe(
      (data: TeamLeader[]) => {
        this.teamLeaders = data;
      },
      error => {
        console.error('Error fetching team leaders:', error);
      }
    );
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
    if (this.departmentForm.valid) {
      if (this.selectedFile) {
        this.departmentService.addDepartment(this.departmentForm.value, this.selectedFile)
          .then((response) => {
            console.log('Department added here is the response', response);
            this.dialogRef.close(response.picture);
          })
          .catch((error) => {
            console.error('Error while adding department:', error);
          });
      } else {
        this.dialogRef.close(this.departmentForm.value);
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
