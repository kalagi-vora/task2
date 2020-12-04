import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RecordsService} from '../records.service';
import { Record } from '../record.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  public allRecords : Record[] = [];
  public pageNumber : number;
  public pages : number[] = [];
  public deletedRecord: any;

  constructor(private http: HttpClient, private recordService: RecordsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.recordService.fetchRecord(1).subscribe(
      records => {
        this.allRecords = records.data;
        this.pageNumber = records.total_pages;
        while(this.pageNumber>0){
          this.pages.push(this.pageNumber);
          this.pageNumber--;
        }
        this.pages.reverse();
      }
    );
  }

  onPageClick(page): void {
    this.recordService.fetchRecord(page).subscribe(
      records => {
        this.allRecords = records.data;
      }
    );
  }

  onClickEdit(data: Record){
    this.recordService.passData(data);
    console.log(this.recordService.showData());
    this.router.navigate([`../edit-record/${data.id}`], {queryParams: {allowEdit: '1'}});
  }

  onClickDelete(id: number){
    this.recordService.deleteRecord(id).subscribe(() => {
      console.log(`Delete Request for id:${id} is successful`);

      for(let i = 0; i < this.allRecords.length; ++i){
        if (+this.allRecords[i].id === id) {
            this.allRecords.splice(i,1);
        }
      }

    })
  }

}
