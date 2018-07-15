import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BillService } from './../services/bill.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from './../constants/companyAddress';
import { Location } from '@angular/common';


@Component({
    selector: 'data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.css']
})
export class DataComponent {
    billData: any = [];
    timePeriod: any;
    totCgst: number;
    totSgst: number;
    totAmount: number;
    totCost: number;
    separateBill: any;
    sdt: any;
    edt: any;
    allGst: any;
    duplicates: any = [];
    deleteResponse: any;
    companyNames: any = [];
    selectedCompany: any = "All";
    url: any;
    timeRange: any;


    constructor(private location: Location, private spinner: NgxSpinnerService, private router: Router, private activatedRoute: ActivatedRoute, private billService: BillService) {
        this.url = location;
    }

    ngOnInit() {

        this.companyNames = Constants.companyAddress();

        this.timePeriod = "presentMonth";
        this.getTimeInterval(this.timePeriod, this.selectedCompany);

        this.spinner.show();
    }

    delete(data) {
        let result = confirm("Are you sure? Want to delete this Bill?");
        if (result) {
            this.billService.deleteBill({ 'invoice': data }).subscribe(ResData => {
                this.deleteResponse = ResData;
                let index = this.billData.map(function (e) { return e._id; }).indexOf(this.deleteResponse._id);
                this.billData.splice(index, 1);

                this.duplicates = [];
                this.totCgst = 0;
                this.totSgst = 0;
                this.totAmount = 0;
                this.totCost = 0;
                this.allGst = 0;

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

            })
        }
    }

    getTimeInterval(data, company) {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);

        if (data === 'presentMonth') {

            let time = {
                'startYear': firstDay.getFullYear(),
                'startMonth': firstDay.getMonth() + 1,
                'startDate': firstDay.getDate(),
                'lastYear': lastDay.getFullYear(),
                'lastMonth': lastDay.getMonth() + 1,
                'lastDate': lastDay.getDate()
            }
            if (company === "All") {
                this.getData(time);
            } else {
                this.getCompanyBills(time, company);
            }

        }
        if (data === 'lastMonth') {

            var now = new Date();
            var lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
            var firstDay = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);


            let time = {
                'startYear': firstDay.getFullYear(),
                'startMonth': firstDay.getMonth() + 1,
                'startDate': firstDay.getDate(),
                'lastYear': lastDay.getFullYear(),
                'lastMonth': lastDay.getMonth() + 1,
                'lastDate': lastDay.getDate()
            }
            if (company === "All") {
                this.getData(time);
            } else {
                this.getCompanyBills(time, company);
            }

        }
    }

    customDate(sdate, edate, company) {
        if (new Date(edate) >= new Date(sdate)) {
            let time = {
                'startYear': sdate.split('-')[0],
                'startMonth': sdate.split('-')[1],
                'startDate': sdate.split('-')[2],
                'lastYear': edate.split('-')[0],
                'lastMonth': edate.split('-')[1],
                'lastDate': edate.split('-')[2]
            }
            if (company === "All") {
                this.getData(time);
            } else {
                this.getCompanyBills(time, company);
            }
        }
    }


    getCompanyBills(time, company) {
        this.spinner.show();
        this.duplicates = [];

        time.companyName = company;
        this.timeRange = {};

        this.timeRange = time;

        this.billService.billByCompany(time).subscribe(data => {
            this.totCgst = 0;
            this.totSgst = 0;
            this.totAmount = 0;
            this.totCost = 0;
            this.allGst = 0;
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

    getData(time) {
        this.timeRange = {};

        this.timeRange = time;

        this.spinner.show();
        this.duplicates = [];
        this.billService.getDetails(time).subscribe(data => {
            this.totCgst = 0;
            this.totSgst = 0;
            this.totAmount = 0;
            this.totCost = 0;
            this.allGst = 0;
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

    billDetail(data) {
        this.separateBill = data;
    }

    printData() {
        window.open(this.url._platformStrategy._platformLocation.location.origin + '/#/print?data=' + window.btoa(JSON.stringify(this.timeRange)));
    }

}

