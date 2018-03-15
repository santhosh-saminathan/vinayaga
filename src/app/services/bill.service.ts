import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class BillService {
    constructor(private http: HttpClient) { }

    storeBill(data) {
       
        // return this.http.post("https://nodeexpress-app.herokuapp.com/test",data);
        return this.http.post("http://localhost:5000/store/bill",data);
    }

    getDetails(){
        return this.http.get("http://localhost:5000/bill");

    }

   
}