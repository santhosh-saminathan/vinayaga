import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BillService } from './../services/bill.service';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
   styleUrls: ['./details.component.css']
})
export class DetailsComponent {
 

  constructor (private router: Router, private activatedRoute: ActivatedRoute, private billService:BillService){
       }

  ngOnInit(){
      this.billService.getDetails().subscribe(data=>{
          console.log(data)
      },err=>{
          console.log(err);
      })
    }


  
}

