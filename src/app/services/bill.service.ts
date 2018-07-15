import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class BillService {
    constructor(private http: HttpClient) { }

    storeBill(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/store/bill", data);
        // return this.http.post("http://localhost:5000/store/bill", data);
    }

    getDetails(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/bill", data);
        // return this.http.post("http://localhost:5000/bill", data);
    }

    deleteBill(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/invoice/delete", data);
        // return this.http.post("http://localhost:5000/invoice/delete", data);
    }

    getSingleBill(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/single/bill", data);
        // return this.http.post("http://localhost:5000/single/bill", data);

    }
    updateBill(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/update/bill", data);
        // return this.http.post("http://localhost:5000/update/bill", data);
    }

    billByCompany(data) {
        return this.http.post("https://nodeexpress-app.herokuapp.com/bill/company", data);
        // return this.http.post("http://localhost:5000/bill/company", data);
    }


}
