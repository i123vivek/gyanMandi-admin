import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { InstituteEditComponent } from './institute-edit/institute-edit.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
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
import { DashboardService } from '../dashboard.service';



@NgModule({
  declarations: [DashboardViewComponent, InstituteEditComponent, StudentEditComponent],
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
  providers: [CookieService,DashboardService]
})
export class DashboardModule { }
