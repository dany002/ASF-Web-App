import {Component, OnInit} from '@angular/core';
import {Department} from "../models/Department";
import {environment} from "../../environments/environment";
import {DepartmentService} from "../services/department.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AddDepartmentDialogComponent} from "../add-department-dialog/add-department-dialog.component";
import {EditDepartmentDialogComponent} from "../edit-department-dialog/edit-department-dialog.component";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit{
  isLoggedIn: boolean = true;
  departments: Department[] = [];
  backendUrl: string = environment.appUrl;

  constructor(private departmentService: DepartmentService, private _dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  constructImageUrl(pictureFileName: string): string {
    return `${this.backendUrl}/images/${pictureFileName}`;
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      (data: Department[]) => {
        // Sort the departments array by the 'name' property
        this.departments = data.sort((a, b) => {
          // Assuming 'name' is a string property, modify the comparison as needed
          return a.id - b.id;
        });

        console.log(data);
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  openAddDepartmentDialog(): void {
    const dialogRef = this._dialog.open(AddDepartmentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received data:', result); // Handle the returned data here
      this.loadDepartments();
    });
  }

  editDepartment(department: Department) {
    const dialogRef = this._dialog.open(EditDepartmentDialogComponent, {
      data: department
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received dataaaaa:', result); // Handle the returned data here
      this.loadDepartments();
    });
  }

  deleteDepartment(department: Department) {
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { id: department.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If 'result' is true (user confirmed), delete the department
        this.departmentService.deleteDepartment(department.id)
          .then((deleted: boolean) => {
            if (deleted) {
              console.log('Department was deleted');
              this.loadDepartments()
            } else {
              console.log('Department was not deleted');
            }
          })
          .catch((error) => {
            console.error('Error deleting department:', error);
          });
      }
    });
  }


}
