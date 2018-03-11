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

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'bill', component:BillComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BillComponent,
    NumberToWordsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NumberToWordsPipe,BillService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
