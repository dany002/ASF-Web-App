import {Component, OnInit} from '@angular/core';
import {AddDepartmentDialogComponent} from "../add-department-dialog/add-department-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Department, DepartmentEditDTO} from "../models/Department";
import {DepartmentService} from "../services/department.service";
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {EditDepartmentDialogComponent} from "../edit-department-dialog/edit-department-dialog.component";
import {AddTeamLeaderDialogComponent} from "../add-team-leader-dialog/add-team-leader-dialog.component";
import {TeamLeaderService} from "../services/team-leader.service";
import {TeamLeader} from "../models/TeamLeader";
import {EditTeamLeaderDialogComponent} from "../edit-team-leader-dialog/edit-team-leader-dialog.component";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoggedIn: boolean = true;
  departments: Department[] = [];
  backendUrl: string = environment.appUrl;
  teamLeaders: TeamLeader[] = [];

  constructor(private departmentService: DepartmentService, private _dialog: MatDialog, private router: Router, private teamLeaderService: TeamLeaderService) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadTeamLeaders();
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

  loadTeamLeaders() {
    this.teamLeaderService.getAllTeamLeaders().subscribe(
      (data: TeamLeader[]) => {
        this.teamLeaders = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching team leaders:', error);
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
      console.log('The dialog was closeddddd');
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

  openAddTeamLeaderDialog() {
    const dialogRef = this._dialog.open(AddTeamLeaderDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received data:', result); // Handle the returned data here
      this.loadTeamLeaders();
    });
  }

  editTeamLeader(teamLeader: TeamLeader) {
    const dialogRef = this._dialog.open(EditTeamLeaderDialogComponent, {
      data: teamLeader
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closeddddd');
      console.log('Received dataaaaa:', result); // Handle the returned data here
      this.loadTeamLeaders();
    });
  }

  deleteTeamLeader(teamLeader: TeamLeader) {
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { id: teamLeader.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If 'result' is true (user confirmed), delete the department
        this.teamLeaderService.deleteTeamLeader(teamLeader.id)
          .then((deleted: boolean) => {
            if (deleted) {
              console.log('Team Leader was deleted');
              this.loadDepartments()
            } else {
              console.log('Team Leader was not deleted');
            }
          })
          .catch((error) => {
            console.error('Error deleting team leader:', error);
          });
      }
    });
  }
}
