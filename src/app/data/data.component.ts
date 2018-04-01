import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BillService } from './../services/bill.service';

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

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private billService: BillService) {
    }

    ngOnInit() {

        this.timePeriod = "presentMonth";
        this.getTimeInterval(this.timePeriod);


    }

    delete(data) {
        let result = confirm("Are you sure? Want to delete this Bill?");
        if (result) {
            this.billService.deleteBill({ 'invoice': data }).subscribe(data => {
                this.ngOnInit();
            }, err => {

            })
        }
    }

    getTimeInterval(data) {

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
            this.getData(time);
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
            this.getData(time);


        }
        if (data === 'presentYear') {

            let time = {
                'startYear': firstDay.getFullYear(),
                'startMonth': 0,
                'startDate': 1,
                'lastYear': lastDay.getFullYear(),
                'lastMonth': 12,
                'lastDate': 31
            }
            this.getData(time);
        }
    }

    customDate(sdate, edate) {
        if (new Date(edate) >= new Date(sdate)) {
            let time = {
                'startYear': sdate.split('-')[0],
                'startMonth': sdate.split('-')[1],
                'startDate': sdate.split('-')[2],
                'lastYear': edate.split('-')[0],
                'lastMonth': edate.split('-')[1],
                'lastDate': edate.split('-')[2]
            }
            this.getData(time);
        }
    }

    getData(time) {

        this.billService.getDetails(time).subscribe(data => {
            this.totCgst = 0;
            this.totSgst = 0;
            this.totAmount = 0;
            this.totCost = 0;

            this.billData = data;

            console.log(this.billData);

            this.billData.sort((a: any, b: any) => {
                if (a.invoice < b.invoice) {
                    return -1;
                } else if (a.invoice > b.invoice) {
                    return 1;
                } else {
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
        console.log(data);
        this.separateBill = data;
    }

}

