import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {ViewChild, ElementRef } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private sevice: SharedService) { }
  empsList: any = [];
  pdfSrc = "./Report.pdf";//"https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  reportSavedName: string = "";// "EmployeesReport";
  PDF = new jspdf('p', 'mm', 'a4');


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
      
      let position = 0;
      this.PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      
      //this.PDF.save('Report.pdf');
      //add my logic
      this.SaveFileToServer(this.PDF);
    });
    
  }

  public SaveFileToServer(file: jspdf) {

    this.sevice.SaveFile(file).subscribe(data => { this.reportSavedName = JSON.stringify( data) });//return check
    var srvMsg = this.reportSavedName;

      this.sevice.reportFileName = this.reportSavedName;

  }

  public ViewReport(): void {
    this.SaveFileToServer(this.PDF);
    if (this.reportSavedName != 'Error') {
      var ReportPath = this.sevice.ReportsURL + this.reportSavedName;
    }


  }

  public downloadAsPDF() {
    const pdfTable = this._content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open({}, window);

  }

  public viewReportPDF() {
    const pdfTable = this._content.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open({}, window);
  }
}  


