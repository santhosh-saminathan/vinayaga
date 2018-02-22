"use strict";

import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Constants } from "../constants/companyAddress";
import { Constants } from './../constants/companyAddress';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    companyData: any = [];
    date: any;
    day: any;
    time: any;
    showInvoiceOption: boolean = true;
    upcomingInvoice: any;
    newinvoice: any;


    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        setInterval(() => {
            this.newTime();
        }, 1);
    }

    ngOnInit() {
        if (!localStorage.getItem('upcomingInvoice')) {
            localStorage.setItem('upcomingInvoice', '0001')
        } else {
          //  this.upcomingInvoice = localStorage.getItem('upcomingInvoice')
        }
   
        this.companyData = Constants.companyAddress();
  

        this.getPersentTime();

    }


    createBill = function (data) {
        localStorage.removeItem('billData');
        localStorage.removeItem('yourDcDate');
        localStorage.removeItem('yourDcNumber');
        localStorage.removeItem('ourDcDate');
        localStorage.removeItem('ourDcNumber');
        localStorage.removeItem('newInvoice');
        this.router.navigate(['/bill'], { queryParams: { company: data } })
    }

    getPersentTime = function () {
        this.date = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
        this.day = new Date().getDay();
        //if(this.day){
        switch (this.day) {
            case 1:
                this.day = "Monday"
                break;
            case 2:
                this.day = "Tuesday"
                break;
            case 3:
                this.day = "Wednesday"
                break;
            case 4:
                this.day = "Thursday"
                break;
            case 5:
                this.day = "Friday"
                break;
            case 6:
                this.day = "Saturday"
                break;
            default:
                this.day = "Sunday"
        }
        //}


    }


    newTime = function () {

        let h: any = new Date().getHours();
        if (h < 10) {
            h = "0" + h;
        }
        let m: any = new Date().getMinutes();
        if (m < 10) {
            m = "0" + m;
        }
        let s: any = new Date().getSeconds();
        if (s < 10) {
            s = "0" + s;
        }

        let ampm = h >= 12 ? 'pm' : 'am';
        h = h % 12;
        h = h ? h : 12;

        this.time = h + ':' + m + ':' + s + ' ' + ampm;
    }

    updateInvoice = function () {
        this.showInvoiceOption = false;
    }

    changeInvoice = function (newInvoice) {
        if (newInvoice) {
            localStorage.setItem('upcomingInvoice', newInvoice.toString())
            this.upcomingInvoice = localStorage.getItem('upcomingInvoice')
            this.showInvoiceOption = true;
        } else {
            this.showInvoiceOption = true;
        }

    }


}
