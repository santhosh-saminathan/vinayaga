import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationExtras } from '@angular/router';
import { BillService } from './../services/bill.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.css']
})
export class PrintBillComponent implements OnInit {
  urlObj: any;
  totCgst: number;
  totSgst: number;
  totAmount: number;
  totCost: number;
  billData: any;
  allGst: any;


  duplicates: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private billService: BillService, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let data = params["data"];
      this.urlObj = JSON.parse(window.atob(data));

      if (this.urlObj.companyName) {
        this.billService.billByCompany(this.urlObj).subscribe(data => {
          this.totCgst = 0;
          this.totSgst = 0;
          this.totAmount = 0;
          this.totCost = 0;

          this.billData = data;

          this.spinner.hide();

          this.billData.sort((a: any, b: any) => {
            if (a.invoice < b.invoice) {
              return -1;
            } else if (a.invoice > b.invoice) {
              return 1;
            } else {
              a.same = true;
              b.same = true;
              this.duplicates.push(a.invoice);
              return 0;
            }
          });
          this.billData.forEach(element => {
            this.totCgst = this.totCgst + element.cgst;
            this.totSgst = this.totSgst + element.sgst;
            this.allGst = this.totCgst + this.totSgst;
            this.totCost = this.totCost + element.totalAmount;
            this.totAmount = this.totAmount + element.totWithGst;
          });
        }, err => {
          console.log(err);
        })
      } else {
        this.spinner.show();
        this.duplicates = [];
        this.billService.getDetails(this.urlObj).subscribe(data => {
          this.totCgst = 0;
          this.totSgst = 0;
          this.totAmount = 0;
          this.totCost = 0;

          this.billData = data;

          this.spinner.hide();

          this.billData.sort((a: any, b: any) => {
            if (a.invoice < b.invoice) {
              return -1;
            } else if (a.invoice > b.invoice) {
              return 1;
            } else {
              a.same = true;
              b.same = true;
              this.duplicates.push(a.invoice);
              return 0;
            }
          });


          this.billData.forEach(element => {
            this.totCgst = this.totCgst + element.cgst;
            this.totSgst = this.totSgst + element.sgst;
            this.allGst = this.totCgst + this.totSgst;
            this.totCost = this.totCost + element.totalAmount;
            this.totAmount = this.totAmount + element.totWithGst;
          });

        }, err => {
          console.log(err);
        })

      }

    });
  }

  printScreen() {
    window.print();
  }


}
