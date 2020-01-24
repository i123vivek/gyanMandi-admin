import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
//import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

import * as $ from 'jquery';
import { ExamService } from './exam.service';
//import { ExaminationComponent } from './exam/examination/examination.component';
//import { AddExamComponent } from './exam/add-exam/add-exam.component';
import { ExamModule } from './exam/exam.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TestSeriesModule } from './test-series/test-series.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CommonModule,
    CKEditorModule,
    FormsModule,
    ExamModule,
    TestSeriesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CookieService,ExamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
