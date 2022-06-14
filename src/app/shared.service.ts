import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44356/api";
  readonly ReportsURL = "https://localhost:44356/ReportsPDF/";
  reportFileName = '';

  constructor(private http: HttpClient) { }
  //method to consum get emps
  getEmployees(): Observable<any[]> { return this.http.get<any>(this.APIUrl + '/Emp') }
  //upload reports to server
  SaveFile(val: any): Observable<any>{ return this.http.post(this.APIUrl + '/emp/SaveFile', val) }
}
