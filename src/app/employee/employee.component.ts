import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {ViewChild, ElementRef } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private sevice: SharedService) { }
  empsList: any = [];

  ngOnInit(): void {
    this.fillReport();
  }
  fillReport() {
    this.sevice.getEmployees().subscribe(data => { this.empsList = data })
  }

  //@ViewChild('content')  content!: ElementRef;
  @ViewChild('content', {static:false}) _content!: ElementRef;
  public SavePDF(): void {
   /* let content = this.content.nativeElement;

    let doc = new jspdf();// 'p','mm',[297,210]);
    let _elementHandlers =
    {

      '#editor': function (element: any, renderer:any) {
        return true;
      }
    };
    doc.html(content);
    //, 15, 15, {

      //'width': 190,
     // 'elementHandlers': _elementHandlers
    //});

    doc.save('test.pdf');*/

    /*
    let pdf = new jspdf('p', 'mm', [297,210]);
    pdf.html(this._content.nativeElement,{ callback: (pdf) => pdf.save("Report.pdf") });
    */

    //using canvas
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jspdf('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Report.pdf');
    });
  }
}  


