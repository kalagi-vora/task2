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

  createRecord(firstName: string, lastName: string, avatar: string) {
    const recordData: Record = { first_name: firstName, last_name: lastName ,avatar : avatar};
    return this.http
      .post<{ data: string }>(
        this.apiUrl,
        recordData
      )
  }

  updateRecord(firstName: string, lastName: string , avatar: string, id:number) {
    const recordData: Record = { first_name: firstName, last_name: lastName, avatar : avatar};
    return this.http
      .patch<{ data: string }>(
        `${this.apiUrl}/${id}`,
        recordData
      )
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
