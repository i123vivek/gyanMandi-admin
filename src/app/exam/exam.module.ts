import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationComponent } from './examination/examination.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
//import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { ExamService } from '../exam.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AddQuestionCategoryComponent } from './add-question-category/add-question-category.component';
import { GenderComponent } from './gender/gender.component';




@NgModule({
  declarations: [ExaminationComponent, AddExamComponent, AddSubjectComponent, AddTopicComponent, AddQuestionCategoryComponent, GenderComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CookieService,ExamService],
})
export class ExamModule { }
