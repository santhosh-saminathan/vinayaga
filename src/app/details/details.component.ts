import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BillService } from './../services/bill.service';

@Component({
    selector: 'details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {


    constructor(private router: Router, private activatedRoute: ActivatedRoute, private billService: BillService) {
    }

    ngOnInit() {
        // this.billService.getDetails().subscribe(data => {
        //     console.log(data)
        // }, err => {
        //     console.log(err);
        // })
    }

    getData() {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        console.log(firstDay.getFullYear(), firstDay.getDate(), firstDay.getMonth());

        let data = {
            'startYear':firstDay.getFullYear(),
            'startMonth':firstDay.getMonth()+1,
            'startDate':firstDay.getDate(),
            'lastYear':lastDay.getFullYear(),
            'lastMonth':lastDay.getMonth()+1,
            'lastDate':lastDay.getDate()
        }

        this.billService.getDetails(data).subscribe(data => {
            console.log(data)
        }, err => {
            console.log(err);
        })

    }


}

