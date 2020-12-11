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
  public urlId: string;

  constructor(private recordService: RecordsService ,
              private route: ActivatedRoute,
              private router: Router ,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.dataOfRecord = this.recordService.showData();

    this.route.params.subscribe(
      (params : Params)=>{
        this.urlId = params['id'];
        this.InitForm();
      }
    )
  }

  private InitForm():void{
    let first_name:string ='';
    let last_name : string ='';
    if(this.urlId!=="new")
    {
      first_name = this.dataOfRecord.first_name;
      last_name = this.dataOfRecord.last_name;
    }
    this.recordForm = new FormGroup({
      'first_name': new FormControl(first_name,Validators.required),
      'last_name': new FormControl(last_name,Validators.required),
    })
  }

  onCreateRecord(recordData: Record): void{
    if(this.urlId==="new")
    {
      this.recordService.createRecord(recordData.first_name, recordData.last_name, recordData.avatar).subscribe(response =>{
        console.log("created record is: " +JSON.stringify(response));
      });
    }
    else{
      this.recordService.updateRecord(recordData.first_name, recordData.last_name ,recordData.avatar, recordData.id = this.dataOfRecord.id).subscribe(response => {
        console.log("Updated record is: " +JSON.stringify(response));
      });
    }
    this.router.navigate(['../recordlist']);
  }

}
