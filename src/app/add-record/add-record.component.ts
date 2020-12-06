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
  public urlId = false;

  constructor(private recordService: RecordsService ,
              private route: ActivatedRoute,
              private router: Router ,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.dataOfRecord = this.recordService.showData();

    this.route.params.subscribe(
      (params : Params)=>{
        this.urlId = params['id']? true : false;
        this.InitForm();
      }
    )
  }

  InitForm()
  {
    let firstName:string ='';
    let lastName : string ='';
    if(this.urlId)
    {
      firstName = this.dataOfRecord.first_name;
      lastName = this.dataOfRecord.last_name;
    }
    this.recordForm = new FormGroup({
      'firstName': new FormControl(firstName,Validators.required),
      'lastName': new FormControl(lastName,Validators.required)
    })
  }


  onCreateRecord(recordData: Record): void{
    if(this.urlId)
    {
      this.recordService.updateRecord(recordData.firstName, recordData.lastName ,recordData.id = this.dataOfRecord.id);
    }
    else{
      this.recordService.createRecord(recordData.firstName, recordData.lastName);
    }
    this.router.navigate(['../recordlist']);
  }

}
