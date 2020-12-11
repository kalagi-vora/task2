import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Record } from './record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private updatedData : Record;
  private apiUrl : string = 'https://reqres.in/api/users';

  constructor(private http : HttpClient) { }

  createRecord(firstName: string, lastName: string) {
    const recordData: Record = { first_name: firstName, last_name: lastName };
    this.http
      .post<{ data: string }>(
        this.apiUrl,
        recordData
      )
      .subscribe(
        responseData => {
          console.log("Record Is:" +JSON.stringify(responseData));
        }
      );
  }


  updateRecord(firstName: string, lastName: string , id:number) {
    const recordData: Record = { first_name: firstName, last_name: lastName};
    this.http
      .patch<{ data: string }>(
        `${this.apiUrl}/${id}`,
        recordData
      )
      .subscribe(
        responseData => {
          console.log("Edited data Is:" +JSON.stringify(responseData));
        }
      );
  }

  passData(data: Record){
    this.updatedData = data;
  }

  showData(){
    return this.updatedData;
  }

  fetchRecord(pageNo)
  {
    return this.http
      .get<any>(
        `${this.apiUrl}?page=${pageNo}`
      );
  }

  deleteRecord(id:number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
