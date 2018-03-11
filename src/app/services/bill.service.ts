import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class BillService {
    constructor(private http: HttpClient) { }

    storeBill() {
        return this.http.get("https://nodeexpress-app.herokuapp.com/test");
    }

   
}