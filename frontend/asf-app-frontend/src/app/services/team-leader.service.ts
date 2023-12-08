import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeamLeader, TeamLeaderAddDTO, TeamLeaderEditDTO} from "../models/TeamLeader";

@Injectable({
  providedIn: 'root'
})
export class TeamLeaderService {

  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTeamLeaders(): Observable<TeamLeader[]> {
    return this.http.get<TeamLeader[]>(`${this.backendUrl}/team-leaders`);
  }

  addTeamLeader(teamLeaderData: TeamLeaderAddDTO, imageFile: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();

      // Append department properties to FormData
      formData.append('name', teamLeaderData.name);
      formData.append('description', teamLeaderData.description);

      // Append the file to FormData
      formData.append('file', imageFile, imageFile.name);

      const headers = new HttpHeaders();
      // Ensure you set the correct headers for multipart form data
      headers.set('Content-Type', 'multipart/form-data');

      this.http.post<any>(`${this.backendUrl}/team-leaders`, formData, { headers: headers })
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

  editTeamLeader(teamLeaderData: TeamLeaderEditDTO, imageFile: File | null, id: number): Promise<any> {
    console.log("IDK EDIT");
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();

      // Append department properties to FormData
      formData.append('name', teamLeaderData.name);
      formData.append('description', teamLeaderData.description);

      // Append the file to FormData
      formData.append('picture', teamLeaderData.picture);

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
      this.http.put<any>(`${this.backendUrl}/team-leaders/${id}`, formData, { headers: headers })
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

  async deleteTeamLeader(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/team-leaders/${id}`, {
        method: 'DELETE'
      });

      return response.status === 204; // Check if deletion was successful (HTTP 204 No Content)
    } catch (error) {
      console.error('Error deleting team leader:', error);
      return false; // Return false if an error occurs during the request
    }
  }
}
