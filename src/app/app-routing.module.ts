import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//add routing of my comp
import { EmployeeComponent } from './employee/employee.component';
import { ReportTestComponent } from './report-test/report-test.component';


const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: 'report-test', component: ReportTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
