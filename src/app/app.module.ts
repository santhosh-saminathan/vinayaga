import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberToWordsPipe } from './number-to-words.pipe'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BillComponent } from './billData/bill.component';
import { BillService } from '././services/bill.service';
import { DataComponent } from './data/data.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrintBillComponent } from './print-bill/print-bill.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'bill', component: BillComponent },
  { path: 'detail', component: DataComponent },
  { path: 'print', component: PrintBillComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BillComponent,
    NumberToWordsPipe,
    DataComponent,
    PrintBillComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NumberToWordsPipe, BillService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
