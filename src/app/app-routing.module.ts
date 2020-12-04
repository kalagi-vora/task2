import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecordComponent } from './add-record/add-record.component';
import { RecordListComponent } from './record-list/record-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'record-list', pathMatch: 'full'},
  { path: 'record-list', component: RecordListComponent },
  { path: 'add-record', component: AddRecordComponent },
  { path: 'edit-record/:id', component: AddRecordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
