import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NumberToWordsPipe } from './../number-to-words.pipe';
import * as jsPDF from "jspdf";
import { Constants } from './../constants/companyAddress';
import { BillService } from './../services/bill.service';

@Component({
    selector: 'bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css']
})
export class BillComponent {
    invoice: any;
    Dcdt: any;
    totalQuantityOfItems: any;
    selectedBillcopy: any;
    yourDcDateData: any;
    ourDcDateData: any;
    showPrintOption: boolean = false;
    companyDetails: any = Constants.companyAddress();
    selectedCompany: any;
    selectedItem: any;
    date: any;
    totalCount: any;
    totRate: any;
    totMaterialPieces: any;
    totMaterialCount: any;
    itemsArray: any = [];
    grandTotal: any;
    cgstRupee: any;
    cgstPaise: any;
    sgstRupee: any;
    sgstPaise: any;
    totIncGst: any;
    cgstRupeeWord: any;
    cgstPaiseWord: any;
    sgstRupeeWord: any;
    sgstPaiseWord: any;
    totIncGstRupeeWord: any;
    totIncGstPaiseWord: any;
    selectedItemName: any;
    showDateUpdate: boolean = true;
    supplyDate: any;
    showInvoiceOption = true;
    displayBill: boolean = true;
    billFormatType: any;
    newinvoice: any;
    dt: any;
    yourDcDate: any;
    yourDcNumber: any;
    ourDcNumber: any;
    ourDcDate: any;
    disabledAPIButton: boolean = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private numberToWordsPipe: NumberToWordsPipe, private billService: BillService) { }

    ngOnInit() {

        if (sessionStorage.getItem('password') === 'test') {
            this.companyDetails.forEach(element => {
                element.items.forEach(element => {
                    element.name = btoa(element.name).slice(0, 20);
                });
            });
        }

        this.date = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
        if (sessionStorage.getItem('supplyDate')) {
            this.supplyDate = sessionStorage.getItem('supplyDate');
        } else {
            this.supplyDate = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();

        }

        this.companyDetails.forEach(element => {
            if (element.code === this.activatedRoute.snapshot.queryParams["company"]) {
                this.selectedCompany = element;
            }
        });
        let modal = document.getElementById('myModal');
        let btn = document.getElementById("myBtn");
        let span = document.getElementById("close");
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        if (sessionStorage.getItem("billData"))
            this.itemsArray = JSON.parse(sessionStorage.getItem("billData"));
        if (sessionStorage.getItem("yourDcDate")) {
            this.yourDcDate = sessionStorage.getItem('yourDcDate');
        }
        if (sessionStorage.getItem('yourDcNumber')) {
            this.yourDcNumber = sessionStorage.getItem('yourDcNumber')
        }
        if (sessionStorage.getItem('ourDcDate')) {
            this.ourDcDate = sessionStorage.getItem('ourDcDate')
        }
        if (sessionStorage.getItem('ourDcNumber')) {
            this.ourDcNumber = sessionStorage.getItem('ourDcNumber');
        }
        if (localStorage.getItem('newInvoice')) {
            this.invoice = localStorage.getItem('newInvoice');
        } else {
            this.invoice = localStorage.getItem('upcomingInvoice');
        }

        if (sessionStorage.getItem('saved')) {
            this.backToHome();
        }




    }

    backToHome = function () {
        sessionStorage.removeItem('billData');
        sessionStorage.removeItem('yourDcDate');
        sessionStorage.removeItem('yourDcNumber');
        sessionStorage.removeItem('ourDcDate');
        sessionStorage.removeItem('ourDcNumber');
        sessionStorage.removeItem('supplyDate');
        sessionStorage.removeItem('billUpdate');
        localStorage.removeItem('newInvoice');
        sessionStorage.removeItem('saved');
        this.router.navigate(['/home']);

    }

    newItem = function (data) {
        this.selectedCompany.items.forEach(element => {
            if (element.name === data) {
                this.selectedItem = element
            }
        });
    }

    billCopyType = function (billType) {
        this.billFormatType = billType;
    }

    materialCount = function (material, count) {
        this.totMaterialPieces = material,
            this.totMaterialCount = count,
            this.totalCount = material * count;
        this.totRate = this.totalCount * this.selectedItem.rate;
    }

    totalQty = function (count) {
        this.totalCount = count;
        this.totRate = count * this.selectedItem.rate;
    }

    addNewItem = function (name, pieces, rate) {
        this.itemsArray.push({
            'desc': name,
            'rate': rate,
            'qty': pieces,
            'total': rate * pieces
        })
        this.selectedItem = null;
        this.selectedItemName = null;
        this.totRate = null;
        this.material = null;
        this.count = null;
        this.total = null;
        this.totalCount = '';
        this.displayBill = false;

        this.newItemName = null;
        this.newItemTotPiece = null;
        this.newItemRate = null;
    }

    addItem = function () {
        if (this.selectedItem.pieces) {
            this.itemsArray.push({
                'desc': this.selectedItem.name + '(' + this.totMaterialPieces + 'X' + this.totMaterialCount + '=' + this.totalCount + ')',
                'rate': this.selectedItem.rate,
                'qty': this.totalCount,
                'total': this.totRate
            })
        }
        else {
            this.itemsArray.push({
                'desc': this.selectedItem.name,
                'rate': this.selectedItem.rate,
                'qty': this.totalCount,
                'total': this.totRate
            })
        }
        this.selectedItem = null;
        this.selectedItemName = null;
        this.totRate = null;
        this.material = null;
        this.count = null;
        this.total = null;
        this.totalCount = '';
        this.displayBill = false;
    }

    deleteItem = function (data) {
        let arrayCount = 0
        this.itemsArray.forEach(element => {
            arrayCount++;
            if (element === data) {
                this.itemsArray.splice(arrayCount - 1, 1)
            }
        });
    }

    loadBill = function () {
        this.showPrintOption = false;
        this.grandTotal = 0;
        this.totalQuantityOfItems = 0;
        let count = 0;
        this.itemsArray.forEach(element => {
            this.grandTotal = this.grandTotal + element.total;
            this.totalQuantityOfItems = this.totalQuantityOfItems + element.qty;
            count++;
            if (count === this.itemsArray.length) {
                this.calculateGst();
            }
        });
        if (this.supplyDate) {
            sessionStorage.setItem('supplyDate', this.supplyDate);
        }
        if (this.selectedCompany.yourDc) {
            if (!this.yourDcNumber) {
                this.showPrintOption = true;
                window.alert("Your DC Number not available");
            } else {
                sessionStorage.setItem('yourDcNumber', this.yourDcNumber);
            }
            if (!this.yourDcDate) {
                this.showPrintOption = true;
                window.alert("Your DC Date not available");
            } else {
                this.yourDcDateData = this.yourDcDate.split('-')[2] + '/' + this.yourDcDate.split('-')[1] + '/' + this.yourDcDate.split('-')[0]
                sessionStorage.setItem('yourDcDate', this.yourDcDate);
            }
        }
        if (this.selectedCompany.ourDc) {
            if (!this.ourDcNumber) {
                this.showPrintOption = true;
                window.alert("Our DC Number not available");
            } else {
                sessionStorage.setItem('ourDcNumber', this.ourDcNumber);
            }
            if (!this.ourDcDate) {
                this.showPrintOption = true;
                window.alert("Our DC Date not available");
            } else {
                this.ourDcDateData = this.ourDcDate.split('-')[2] + '/' + this.ourDcDate.split('-')[1] + '/' + this.ourDcDate.split('-')[0]
                sessionStorage.setItem('ourDcDate', this.ourDcDate);
            }


        }
        if (this.selectedCompany.billDifferentType) {
            if (!this.selectedBillcopy) {
                this.showPrintOption = true;
                window.alert("Bill type not available");
            }
        }
    }

    calculateGst = function () {

        this.cgstRupee = Math.round((this.grandTotal * 9) / 100);
        this.sgstRupee = Math.round((this.grandTotal * 9) / 100);
        this.totIncGst = (parseFloat(this.grandTotal) + (parseInt(this.cgstRupee) + parseInt(this.sgstRupee)));

        this.cgstRupeeWord = this.numberToWordsPipe.transform(this.cgstRupee);
        this.cgstRupeeWord = this.cgstRupeeWord.charAt(0).toUpperCase() + this.cgstRupeeWord.slice(1)
        this.sgstRupeeWord = this.numberToWordsPipe.transform(this.sgstRupee);
        this.sgstRupeeWord = this.sgstRupeeWord.charAt(0).toUpperCase() + this.sgstRupeeWord.slice(1)

        this.totIncGstRupeeWord = this.numberToWordsPipe.transform(Math.floor(this.totIncGst));
        this.totIncGstRupeeWord = this.totIncGstRupeeWord.charAt(0).toUpperCase() + this.totIncGstRupeeWord.slice(1)


    }

    showDateOption = function () {
        this.showDateUpdate = false;
    }

    updateDate = function (newDate) {
        if (newDate) {
            this.supplyDate = newDate.split('-')[2] + "/" + newDate.split('-')[1] + "/" + newDate.split('-')[0]
            this.showDateUpdate = true;
        } else {
            this.showDateUpdate = true;
        }
    }

    updateInvoice = function () {
        this.showInvoiceOption = false;
    }

    changeInvoiceOnce = function (newInvoice) {
        if (newInvoice) {
            this.billService.getSingleBill({ 'invoice': newInvoice }).subscribe(data => {
                if (data) {
                    this.yourDcNumber = data.yourDcNumber;
                    this.ourDcNumber = data.ourDcNumber;
                    this.itemsArray = data.items;
                    this.yourDcDate = data.yourDcDate;
                    this.ourDcDate = data.ourDcDate;
                    sessionStorage.setItem('billUpdate', 'true');

                }

            }, err => {
                console.log(err);
            }, () => {
                // console.log("finishes");
            })
            localStorage.setItem('newInvoice', newInvoice.toString())
            this.invoice = localStorage.getItem('newInvoice')
            this.showInvoiceOption = true;
        } else {
            this.showInvoiceOption = true;
        }
    }

    changeInvoiceAll = function (newInvoice) {
        if (newInvoice) {
            this.billService.getSingleBill({ 'invoice': newInvoice }).subscribe(data => {
                if (data) {
                    this.yourDcNumber = data.yourDcNumber;
                    this.ourDcNumber = data.ourDcNumber;
                    this.itemsArray = data.items;
                    this.yourDcDate = data.yourDcDate;
                    this.ourDcDate = data.ourDcDate;
                    sessionStorage.setItem('billUpdate', 'true');

                }

            }, err => {
                console.log(err);
            })
            localStorage.setItem('upcomingInvoice', newInvoice.toString())
            this.invoice = localStorage.getItem('upcomingInvoice')
            this.showInvoiceOption = true;
        } else {
            this.showInvoiceOption = true;
        }
    }


    submit = function (billContent) {

        this.disabledAPIButton = true;
        let data = {
            'invoice': this.invoice,
            'totalAmount': this.grandTotal,
            'totWithGst': this.totIncGst,
            'cgst': this.cgstRupee,
            'sgst': this.sgstRupee,
            'items': this.itemsArray,
            'companyName': this.selectedCompany.name,
            'supplyDate': this.supplyDate,
            'yourDcNumber': this.yourDcNumber ? this.yourDcNumber : null,
            'yourDcDate': this.yourDcDateData ? this.yourDcDateData : null,
            'ourDcDate': this.ourDcDateData ? this.ourDcDateData : null,
            'ourDcNumber': this.ourDcNumber ? this.ourDcNumber : null,
        }

        if (sessionStorage.getItem('billUpdate') === 'true') {

            this.billService.updateBill(data).subscribe(resdata => {
                
            }, err => {
                console.log("Errrorr", err);
            }, () => {
                this.disabledAPIButton = false;
                sessionStorage.setItem('saved', 'true');
                sessionStorage.removeItem('billUpdate');
                const elementToPrint = document.getElementById(billContent); //The html element to become a pdf
                document.body.innerHTML = document.getElementById(billContent).innerHTML;
                sessionStorage.setItem('billData', JSON.stringify(this.itemsArray))
                const doc = new jsPDF();
                if (localStorage.getItem('newInvoice')) {
                    if (this.invoice > localStorage.getItem('upcomingInvoice')) {
                        localStorage.setItem('upcomingInvoice', (parseInt(this.invoice) + 1).toString());
                    } else {
                        console.log("no change in invoice")
                    }
                } else {
                    localStorage.setItem('upcomingInvoice', (parseInt(localStorage.getItem('upcomingInvoice')) + 1).toString());
                }
                setTimeout(function () {
                    window.print();
                    location.reload();
                }, 1000);
            })

        } else {
            this.billService.storeBill(data).subscribe(resdata => {
              

            }, err => {
                console.log("Errrorr", err);
              

            }, () => {
                this.disabledAPIButton = false;
                sessionStorage.setItem('saved', 'true');
                const elementToPrint = document.getElementById(billContent); //The html element to become a pdf
                document.body.innerHTML = document.getElementById(billContent).innerHTML;
                sessionStorage.setItem('billData', JSON.stringify(this.itemsArray))
                const doc = new jsPDF();
                if (localStorage.getItem('newInvoice')) {
                    if (this.invoice > localStorage.getItem('upcomingInvoice')) {
                        localStorage.setItem('upcomingInvoice', (parseInt(this.invoice) + 1).toString());
                    } else {
                        console.log("no change in invoice")
                    }
                } else {
                    localStorage.setItem('upcomingInvoice', (parseInt(localStorage.getItem('upcomingInvoice')) + 1).toString());
                }
                setTimeout(function () {
                    window.print();
                    location.reload();
                }, 1000);
            })
        }

    }

    print = function (billContent) {

        const elementToPrint = document.getElementById(billContent); //The html element to become a pdf

        document.body.innerHTML = document.getElementById(billContent).innerHTML;
        sessionStorage.setItem('billData', JSON.stringify(this.itemsArray))
        window.print();
        location.reload();
    }

}

