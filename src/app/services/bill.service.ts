import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class BillService {
    constructor(private http: HttpClient) { }

    storeBill(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/store/bill", data);
    }

    getDetails(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/bill", data);

    }


}