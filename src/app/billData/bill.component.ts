import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NumberToWordsPipe } from './../number-to-words.pipe';
import * as jsPDF from "jspdf";
import * as html2canvas from 'html2canvas';
import * as html2pdf  from 'html2pdf.js'
declare var $:any;

@Component({
    selector: 'bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css']
})
export class BillComponent {
    invoice: any;
    Dcdt: any;
    totalQuantityOfItems:any;
    selectedBillcopy:any;
    yourDcDateData:any;
    ourDcDateData:any;

    companyDetails: any = [
        {
            code: 'AVCL',
            name: 'Anugraha Valve Castings Limited',
            address: '391/2, Sengoda goundan Pudur',
            city: 'Coimbatore-641407',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AACCA2285Q1ZF',
            //Billformat: true,
            serviceAccountCode:998898,
            ourDc:false,
            yourDc:true,
            billDifferentType:false,
            displayTotNos:false,
            items: [
                {
                    'name': 'Stainless steel impact',
                    'rate': 84,
                    'pieces': true
                }, {
                    'name': 'Non alloy steel impact',
                    'rate': 63,
                    'pieces': true
                },{
                    'name': 'Stainless steel full length impact',
                    'rate': 420,
                    'pieces': false
                }, {
                    'name': 'Stainless steel IGC',
                    'rate': 84,
                    'pieces': false
                },  {
                    'name': 'Stainless steel IGC G48',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel full length impact',
                    'rate': 367,
                    'pieces': false
                }, {
                    'name': 'Stainless steel IBR bend',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Stainless steel weld test plate V groove',
                    'rate': 420,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel weld test plate V groove',
                    'rate': 420,
                    'pieces': false
                }
            ]
        },
        {
            code: 'AVCL6',
            name: 'Anugraha Valve Castings Limited(Unit-VI)',
            address: '168/1,Pathuvampalli Village & Panchayat,sulur tk',
            city: 'Coimbatore-641659',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AACCA2285Q1ZF',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:false,
            displayTotNos:false,
            items: [
                {
                    'name': 'Stainless steel impact',
                    'rate': 84,
                    'pieces': true
                }, {
                    'name': 'Stainless full length impact',
                    'rate': 420,
                    'pieces': false
                }, {
                    'name': 'Stainless steel IGC',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel impact',
                    'rate': 63,
                    'pieces': true
                }, {
                    'name': 'Stainless steel IGC G48',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel full length impact',
                    'rate': 367,
                    'pieces': false
                }, {
                    'name': 'Stainless steel IBR bend',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Stainless steel weld test plate V groove',
                    'rate': 420,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel weld test plate V groove',
                    'rate': 420,
                    'pieces': false
                }
            ]
        },

        {
            code: 'SRVACPL',
            Bill: true,
            name: 'Sri Ranganathar Valves And Control Private Limited',
            address: '5/239 & 5/240,Karegoundenpalayam,Annur',
            city: 'Coimbatore-641697',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AAWCS8068D1ZV',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:true,
            displayTotNos:false,
            items: [{
                    'name': 'Stainless Steel Impact',
                    'rate': 55,
                    'pieces': true
                }, {
                    'name': 'Non Alloy Steel Impact ',
                    'rate': 35,
                    'pieces': true
                }, {
                    'name': 'Stainless Steel IGC Bend ',
                    'rate': 140,
                    'pieces': false
                }, {
                    'name': 'Stainless Steel IGC A ',
                    'rate': 15,
                    'pieces': false
                }
            ]

        }, {
            code: 'AVCL5',
            name: 'Anugraha Valve Castings Limited(Unit-V)',
            address: '307, Sengoda goundan Pudur',
            city: 'Coimbatore-641407',
            state: 'Tamilnadu',
            stateCode: '33',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            gst: '33AACCA2285Q1ZF',
            billDifferentType:false,
            displayTotNos:false,
            items: [
                {
                    'name': 'Stainless steel impact',
                    'rate': 84,
                    'pieces': true
                }, {
                    'name': 'Stainless full length impact',
                    'rate': 420,
                    'pieces': false
                }, {
                    'name': 'Stainless steel IGC',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel impact',
                    'rate': 63,
                    'pieces': true
                }, {
                    'name': 'Stainless steel IGC G48',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel full length impact',
                    'rate': 367,
                    'pieces': false
                }, {
                    'name': 'Stainless steel IBR bend',
                    'rate': 84,
                    'pieces': false
                }, {
                    'name': 'Stainless steel weld test plate V groove',
                    'rate': 420,
                    'pieces': false
                }, {
                    'name': 'Non alloy steel weld test plate V groove',
                    'rate': 420,
                    'pieces': false
                }
            ]

        },
         {
            code: 'MASPL',
            name: 'Mira Alloy Steels Private Limited',
            address: 'S.F.No 363,Kurumbapalayam',
            city: 'Coimbatore-641107',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AAICS1449JIZ9',
            //Billformat: false,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:true,
            displayTotNos:false,
            items: [
                {
                    'name': 'Stainless Steel Impact',
                    'rate': 100,
                    'pieces': true
                },
                {
                    'name': 'Carbon Steel Impact',
                    'rate': 85,
                    'pieces': true
                },
                {
                    'name': 'Stainless Steel tensile',
                    'rate': 55,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel tensile',
                    'rate': 45,
                    'pieces': false
                },
                {
                    'name': 'Stainless Steel Micro',
                    'rate': 70,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Micro',
                    'rate': 70,
                    'pieces': false
                },
                {
                    'name': 'Stainless Steel Hardness',
                    'rate': 70.0,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Hardness',
                    'rate': 70,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Hardness Cutting Purpose',
                    'rate': 150,
                    'pieces': false
                },
                {
                    'name': 'Stainless Steel Weld test plate 40mm',
                    'rate': 70.0,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Weld test plate 40mm',
                    'rate': 700,
                    'pieces': false
                },
                {
                    'name': 'Stainless Steel IGC (E)',
                    'rate': 150,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Bend',
                    'rate': 120,
                    'pieces': false
                }, {
                    'name': 'Carbon Steel Test Block',
                    'rate': 100,
                    'pieces': false
                }, {
                    'name': 'Carbon Steel V groove ',
                    'rate': 700,
                    'pieces': false
                }, {
                    'name': 'Carbon Steel UT Block',
                    'rate': 100,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Test Plate 40mm Tensile Specimen',
                    'rate': 450,
                    'pieces': false
                },
                {
                    'name': 'Carbon Steel Test Plate Bend Specimen',
                    'rate': 300,
                    'pieces': false
                }, {
                    'name': 'Carbon Steel Test Plate Macro Specimen ',
                    'rate': 300,
                    'pieces': false
                }, {
                    'name': 'Carbon Steel Test Plate Impact',
                    'rate': 125,
                    'pieces': true
                }]
        },
        {
            code: 'REW',
            name: 'Rukmani Engineering Works',
            address: '5/235/C4,Kuppanaiken Road, Somayampalayam',
            city: 'Coimbatore-641108',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33ACQPR8448H1ZZ',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:false,
            displayTotNos:false,
            items: [{
                'name': 'Non Alloy Steel Tensile Test Bar',
                'rate': 50,
                'pieces': false
                }, {
                    'name': 'Stainless Steel Tensile Test Bar ',
                    'rate': 50,
                    'pieces': false
                }
            ]
        },
        {
            code: 'SSACIPL',
            name: 'S.S.A Castings India Private Limited',
            address: 'Plot no 90-c Cosmafan foundry cluster park-1,Arasur',
            city: 'Coimbatore-641407',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AAKCS9336C1ZC',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:true,
            displayTotNos:true,
            items: [{
                    'name': 'Stainless steel impact',
                    'rate': 55,
                    'pieces': true
                }, {
                    'name': 'Non Alloy steel impact',
                    'rate': 35,
                    'pieces': true
                }, {
                    'name': 'Stainless steel impact IGC bend',
                    'rate': 140,
                    'pieces': false
                }, {
                    'name': 'Stainless steel impact IGC (A) ',
                    'rate': 15,
                    'pieces': false
                }, {
                    'name': 'Stainless steel full length impact',
                    'rate': 165,
                    'pieces': true
                }, {
                    'name': 'Non Alloy steel full length impact',
                    'rate': 145,
                    'pieces': true
                },
                {
                    'name': 'Non Alloy steel spectro sample',
                    'rate': 125,
                    'pieces': false
                },
                {
                    'name': 'Non Alloy steel IBR bend',
                    'rate': 155,
                    'pieces': false
                }
            ]
        },
        {
            code: 'URCAAPL',
            name: 'UR Castings And Alloys Private Limited',
            address: 'S.F.No-76&80,Thirumalayampalayam Post',
            city: 'Coimbatore-641105',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AAACU7496B1ZD',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:true,
            yourDc:true,
            billDifferentType:false,
            displayTotNos:false,
            items: [{
                    'name': 'Stainless steel Impact',
                    'rate': 100,
                    'pieces': true
                }, {
                    'name': 'Non Alloy steel Impact',
                    'rate': 80,
                    'pieces': true
                }, {
                    'name': 'Stainless steel IGC(E) ',
                    'rate': 100,
                    'pieces': true
                }, {
                    'name': 'Non Alloy steel Round Bar',
                    'rate': 150,
                    'pieces': false
                }, {
                    'name': 'Non Alloy steel Bend',
                    'rate': 175,
                    'pieces': false
                },
                {
                    'name': 'Non Alloy steel IBR Bend',
                    'rate': 175,
                    'pieces': true
                }
            ]

        },
        {
            code: 'SRI',
            name: 'Sri Ranganather Industries',
            Bill: true,
            address: '12/45,Thadagam main road',
            city: 'Coimbatore-641025',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AADCS0183Q1Z3',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:true,
            displayTotNos:false,
            items: [{
                    'name': 'Stainless steel impact',
                    'rate': 55,
                    'pieces': true,
                }, {
                    'name': 'Non Alloy steel impact',
                    'rate': 35,
                    'pieces': true,
                }, {
                    'name': 'Stainless steel  IGC bend',
                    'rate': 140,
                    'pieces': false
                }, {
                    'name': 'Stainless steel impact IGC A',
                    'rate': 15,
                    'pieces': false
                }, {
                    'name': 'Stainless steel full length impact',
                    'rate': 165,
                    'pieces': true
                }, {
                    'name': 'Non Alloy steel full length impact',
                    'rate': 145,
                    'pieces': true
                },
                {
                    'name': 'Non Alloy steel spectro sample',
                    'rate': 125,
                    'pieces': false
                },
                {
                    'name': 'Non Alloy steel IBR bend',
                    'rate': 155,
                    'pieces': false
                }
            ]
        },
        {
            code: 'SRVPL',
            name: 'Sri Ranganathar Valves Private Limited',
            diffBill: true,
            address: '7/109, Arasur',
            city: 'Coimbatore-641407',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AALCS5492C1ZA',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:true,
            displayTotNos:false,
            items: [{
                    'name': 'Stainless Steel Impact',
                    'rate': 65,
                    'pieces': true
                }, {
                    'name': 'Non Alloy Steel Impact ',
                    'rate': 45,
                    'pieces': true
                }, {
                    'name': 'Stainless Steel IGC Bend ',
                    'rate': 150,
                    'pieces': false
                }, {
                    'name': 'Stainless Steel IGC A ',
                    'rate': 15,
                    'pieces': false
                }
            ]


        },
        {
            code: 'URCAAPL',
            name: 'UR Castings And Alloys Private Limited',
            address: 'S.F.No-76&80,Thirumalayampalayam Post',
            city: 'Coimbatore-641105',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AAACU7496B1ZD',
            //Billformat: true,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:false,
            displayTotNos:false,
            items: [{
                    'name': 'Stainless Steel Tensile Test Bar',
                    'rate': 55,
                    'pieces': false
                }, {
                    'name': 'Non Alloy Steel Tensile Test Bar',
                    'rate': 45,
                    'pieces': false
                }, {
                    'name': 'Non Alloy Steel Impact',
                    'rate': 45,
                    'pieces': false
                }, {
                    'name': 'Stainless Steel Impact',
                    'rate': 70,
                    'pieces': true
                }, {
                    'name': 'Weld Test Plate Stainless Steel Tensile',
                    'rate': 450,
                    'pieces': false
                },
                {
                    'name': 'Weld Test Plate Stainless Steel Impact',
                    'rate': 250,
                    'pieces': true
                }]
        },
        {
            code: 'VSPL',
            name: 'Veeyes Steelcast Private Limited',
            address: '4/363-A,Kallipalayam,karamadai',
            city: 'Coimbatore-641104',
            state: 'Tamilnadu',
            stateCode: '33',
            gst: '33AAECV0350M1ZE',
            //Billformat: false,
            serviceAccountCode:998931,
            ourDc:false,
            yourDc:true,
            billDifferentType:false,
            displayTotNos:false,
            items: [{
                    'name': 'Carbon steel impact',
                    'rate': 90,
                    'pieces': true
                },  {
                    'name': '  Stainless steel impact',
                    'rate': 100,
                    'pieces': true
                },  {
                    'name': '  Stainless steel IGC-E',
                    'rate': 250,
                    'pieces': false
                },{
                    'name': 'Sample die rework purpose(double side)',
                    'rate': 600,
                    'pieces': false
                }
            ]

        }
    ]

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
    ourDcNumber:any;
    ourDcDate:any;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private numberToWordsPipe: NumberToWordsPipe) { }

    ngOnInit() {

        this.invoice = localStorage.getItem('upcomingInvoice')
        this.date = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
        this.supplyDate = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();

        this.companyDetails.forEach(element => {
            if (element.code === this.activatedRoute.snapshot.queryParams["company"]) {
                console.log(element)
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

        if(localStorage.getItem("billData"))
        this.itemsArray = JSON.parse(localStorage.getItem("billData"));

    }

    backToHome = function () {
        localStorage.removeItem('billData');
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
        console.log(billType)
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
    }
    addItem = function () {
        if (this.selectedItem.pieces) {
            this.itemsArray.push({
                'desc': this.selectedItem.name + '(' + this.totMaterialPieces + '*' + this.totMaterialCount + '=' + this.totalCount + ')',
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
                console.log("match found", arrayCount)
            }
        });
    }

    loadBill = function () {
        this.grandTotal = 0;
        this.totalQuantityOfItems = 0;
        let count = 0;
        this.itemsArray.forEach(element => {
            console.log(element)
            this.grandTotal = this.grandTotal + element.total;
            this.totalQuantityOfItems = this.totalQuantityOfItems + element.qty;
            count++;
            if (count === this.itemsArray.length) {
                this.calculateGst();
            }
        });
        if(this.selectedCompany.yourDc){
            if(!this.yourDcNumber){
                window.alert("Your DC Number not available");
            }
            if(!this.yourDcDate){
                window.alert("Your DC Date not available");
            }else{
                this.yourDcDateData = this.yourDcDate.split('-')[2]+'/'+this.yourDcDate.split('-')[1]+'/'+this.yourDcDate.split('-')[0]
            }
        }
        if(this.selectedCompany.ourDc){
            if(!this.yourDcNumber){
                window.alert("Our DC Number not available");
            }
            if(!this.yourDcDate){
                window.alert("Our DC Date not available");
            }else{
                this.ourDcDateData = this.ourDcDate.split('-')[2]+'/'+this.ourDcDate.split('-')[1]+'/'+this.ourDcDate.split('-')[0]
            }
            

        }
        if(this.selectedCompany.billDifferentType){
            if(!this.selectedBillcopy){
                window.alert("Bill type not available");
            }
            console.log(this.selectedBillcopy)
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

    changeInvoice = function (newInvoice) {
        if (newInvoice) {
            localStorage.setItem('upcomingInvoice', newInvoice.toString())
            this.invoice = localStorage.getItem('upcomingInvoice')
            this.showInvoiceOption = true;
        } else {
            this.showInvoiceOption = true;
        }
    }

    submit = function (billContent) {
        const elementToPrint = document.getElementById(billContent); //The html element to become a pdf
       
        document.body.innerHTML = document.getElementById(billContent).innerHTML;
        localStorage.setItem('billData',JSON.stringify(this.itemsArray))
       
         const doc = new jsPDF();
        // pdf.fromHTML($('#billContent'), () => {
        // });
        // pdf.save("sample.pdf");

        // doc.fromHTML($('#billContent').html(), 15, 15, {
        //     'width': 170
        // });
        // doc.save('sample-file.pdf');


        html2pdf(document.body,{
            margin: 0.5,
            filename:     localStorage.getItem('upcomingInvoice')+"("+new Date().getDate()+"-"+(new Date().getMonth()+1)+").pdf",
            });
        localStorage.setItem('upcomingInvoice', (parseInt(this.invoice) + 1).toString());
       
        setTimeout(function () {
             window.print();
             location.reload();
        },1000)
    }

    // print = function () {
    //     window.print();
    //     location.reload();
    // }

}

