import { Component, OnInit, ElementRef, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ExamService } from './../../exam.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css'],
  providers: [Location]
})
export class EditExamComponent implements OnInit,OnDestroy {
  public currentExam;

  constructor(public examService: ExamService, private location: Location, public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private el: ElementRef) { }

  ngOnInit() {

    let currentExamId= this._route.snapshot.paramMap.get('id');
    console.log("currentSiteId is :", currentExamId);
    // console.log("user details ", this.userService.getUserInfoFromLocalstorage());
    // this.userName = this.userService.getUserInfoFromLocalstorage().userDetails.name;
    // this.authToken = this.userService.getUserInfoFromLocalstorage().authToken;

    // this.currentExam=this.examService.getExamDetails(currentExamId).subscribe(
    //   apiResponse =>{
    //     console.log ("logging data",apiResponse);
    //     // console.log(data);
    //     this.currentExam=apiResponse.data;
    //     console.log("current site details is :", this.currentExam);
    //     this.toastr.successToastr('This is success toast.', 'Success!');

    //   },

    //   error =>{
    //     console.log ("some error message occured");
    //     console.log(error.errorMessage);
    //     this.toastr.errorToastr('This is error toast.', 'Oops!');

        
    //   }
    // )
  }

  ngOnDestroy(){
  }

}
