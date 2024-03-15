import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Email} from "../models/Email";
import {DepartmentAddDTO} from "../models/Department";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendEmail(email: Email): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      formData.append('firstName', email.firstName);
      formData.append('lastName', email.lastName);
      formData.append('email', email.email);
      formData.append('message', email.message);


      this.http.post<any>(`${this.backendUrl}/sendEmail`, formData)
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


}
