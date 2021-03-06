import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
})
export class AppComponent {
    date: any;
    day: any;
    time: any;
    allowUser: boolean = false;
    password: any;
    showWarning: boolean = false;
    showHeader: boolean = true;
    url: any;

    constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
        setInterval(() => {
            this.newTime();
        }, 1);
        this.url = location;
    }

    ngOnInit() {
        let str = window.location.href;
        if (str.includes('detail') || str.includes('print')) {
            this.showHeader = false;
        } else {
            this.showHeader = true;
        }
        this.getPersentTime();
        if (sessionStorage.getItem('password')) {
            this.login(sessionStorage.getItem('password'));
        }
    }

    login(password) {
        if (password === "test@123" || password === "vin1912") {
            this.allowUser = true;
            sessionStorage.setItem('password', password)
        } else {
            this.allowUser = false;
            this.showWarning = true;
        }
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



}

