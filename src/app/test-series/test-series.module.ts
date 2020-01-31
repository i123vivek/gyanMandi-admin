import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TestSeriesComponent } from './test-series/test-series.component';
import { AddTestSeriesComponent } from './add-test-series/add-test-series.component';
import { AddTestComponent } from './add-test/add-test.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
//import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TreeviewModule } from 'ngx-treeview';
import { TestService } from '../test.service';
import { QuestionPageComponent } from './question-page/question-page.component';



@NgModule({
  declarations: [TestSeriesComponent, AddTestSeriesComponent, AddTestComponent, AddQuestionComponent, QuestionPageComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    TreeviewModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CookieService, DatePipe, TestService]
})
export class TestSeriesModule { }
