import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Department, DepartmentAddDTO, DepartmentEditDTO} from '../models/Department';
import { environment } from '../../environments/environment';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.backendUrl}/departments`);
  }

  addDepartment(departmentData: DepartmentAddDTO, imageFile: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      // Append department properties to FormData
      formData.append('name', departmentData.name);
      formData.append('description', departmentData.description);
      formData.append('teamLeaderId', departmentData.team_leader.toString()); // I send only the id
      // Append the file to FormData
      formData.append('file', imageFile, imageFile.name);

      const headers = new HttpHeaders();
      // Ensure you set the correct headers for multipart form data
      headers.set('Content-Type', 'multipart/form-data');

      this.http.post<any>(`${this.backendUrl}/departments`, formData, { headers: headers })
        .subscribe(
          (response) => {
            console.log(response);
            console.log("HI");
            resolve(response);
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  editDepartment(departmentData: DepartmentEditDTO, imageFile: File | null, id: number): Promise<any> {
    console.log("IDK EDIT");
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      console.log(departmentData);
      // Append department properties to FormData
      formData.append('name', departmentData.name);
      formData.append('description', departmentData.description);
      formData.append('teamLeaderId', departmentData.team_leader.toString());
      formData.append('picture', departmentData.picture);
      // Append the file to FormData
      if(imageFile != null)
        formData.append('file', imageFile, imageFile.name);
      else{
        // Add a placeholder or an empty file here
        const emptyFile = new File([], 'empty-file.txt', { type: 'text/plain' });
        formData.append('file', emptyFile, emptyFile.name);
      }

      const headers = new HttpHeaders();
      // Ensure you set the correct headers for multipart form data
      headers.set('Content-Type', 'multipart/form-data');
      this.http.put<any>(`${this.backendUrl}/departments/${id}`, formData, { headers: headers })
        .subscribe(
          (response) => {
            console.log(response);
            console.log("HI");
            resolve(response);
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  async deleteDepartment(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/departments/${id}`, {
        method: 'DELETE'
      });

      return response.status === 204; // Check if deletion was successful (HTTP 204 No Content)
    } catch (error) {
      console.error('Error deleting department:', error);
      return false; // Return false if an error occurs during the request
    }
  }
}
