import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const url = "https://nodeexpress-app.herokuapp.com/";
const url = "http://app-be9c83cc-2fff-4500-b796-9e62c246168a.cleverapps.io/"

@Injectable()
export class BillService {

    constructor(private http: HttpClient) { }

    storeBill(data) {
        return this.http.post(url + "store/bill", data);
        // return this.http.post("http://localhost:5000/store/bill", data);
    }

    getDetails(data) {
        return this.http.post(url + "bill", data);
        // return this.http.post("http://localhost:5000/bill", data);
    }

    deleteBill(data) {
        return this.http.post(url + "invoice/delete", data);
        // return this.http.post("http://localhost:5000/invoice/delete", data);
    }

    getSingleBill(data) {
        return this.http.post(url + "single/bill", data);
        // return this.http.post("http://localhost:5000/single/bill", data);

    }
    updateBill(data) {
        return this.http.post(url + "update/bill", data);
        // return this.http.post("http://localhost:5000/update/bill", data);
    }

    billByCompany(data) {
        return this.http.post(url + "bill/company", data);
        // return this.http.post("http://localhost:5000/bill/company", data);
    }


}
