import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecordComponent } from './add-record/add-record.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecordListComponent } from './record-list/record-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'recordlist', pathMatch: 'full'},
  { path: 'recordlist', component: RecordListComponent},
  { path: 'recordlist/new', component: AddRecordComponent },
  { path: 'recordlist/:id', component: AddRecordComponent },
  { path:  '**' , component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
