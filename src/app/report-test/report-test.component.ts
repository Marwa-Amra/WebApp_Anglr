import { Component, OnInit } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-report-test',
  templateUrl: './report-test.component.html',
  styleUrls: ['./report-test.component.css']
})
export class ReportTestComponent implements OnInit {

  constructor(private sevice: SharedService) { }


  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  reportPath = "";

  ngOnInit(): void {
    var str = this.sevice.reportFileName;
    this.ViewReport(str);

  }

  public ViewReport(fName: string): void {
    if (fName != 'Error') {
      this.reportPath = this.sevice.ReportsURL + fName;

    }
    alert("gggggggggggggggg");
  }

}
