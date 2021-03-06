import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomDashboardComponent } from './classroom-dashboard/classroom-dashboard.component';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CKEditorModule } from 'ng2-ckeditor';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClassroomService } from '../classroom.service';



@NgModule({
  declarations: [ClassroomDashboardComponent, AddClassroomComponent, AddStudentComponent],
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
  providers: [CookieService,ClassroomService]
})
export class ClassroomModule { }
