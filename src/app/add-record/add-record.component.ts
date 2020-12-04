import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';
import { Record} from '../record.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit{

  public recordForm: FormGroup;
  public dataOfRecord : Record;
  public allowEdit = false;

  constructor(private recordService: RecordsService ,
              private route: ActivatedRoute,
              private router: Router ,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.dataOfRecord = this.recordService.showData();

    this.recordForm = new FormGroup({
      'firstName': new FormControl(null,Validators.required),
      'lastName': new FormControl(null,Validators.required)
    })

    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
  }

  onCreateRecord(recordData: Record): void{
    this.recordService.createRecord(recordData.firstName, recordData.lastName);
  }

  onUpdateRecord(recordData: Record): void{
    this.recordService.updateRecord(recordData.firstName, recordData.lastName ,recordData.id = this.dataOfRecord.id);
  }

}
