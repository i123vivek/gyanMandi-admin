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

  public uploader: FileUploader = new FileUploader({});
  public phases: number[];
  public examName: any;
  public examYear: string;
  public status: any = 'active';
  public phaseNumber: any;
  public weightageOfExam: any;
  public phaseName1: any;
  public weightageOfPhase1: any;
  public phaseName2: any;
  public weightageOfPhase2: any;
  public phaseName3: any;
  public weightageOfPhase3: any;
  public examPattern: string;
  public Syllabus: string;
  public aboutExam: string;
  public filesToUpload: Array<File> = [];

  dropdownYear = [];
  dropdownSettings = {};
  form: FormGroup;
  ckeConfig: any;
  public submitted: boolean = false;
  currentExamId: string;
  image: any;

  constructor(public examService: ExamService, private location: Location, public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private el: ElementRef) { }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: true,
      autoParagraph: false,
      extraPlugins: 'divarea,mathjax',
      mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      forcePasteAsPlainText: true,
      pasteFromWordRemoveFontStyles: true,    

      on: {

        instanceReady: function (evt) {
          var rule = {
            attributeNames: [
              [(/^data-cke-pa-on/), 'on'],
            ],
          };

          evt.editor.dataProcessor.dataFilter.addRules(rule, { applyToAll: true });

        }
      }
    };

    this.phases = [1, 2, 3];

    var year = new Date().getFullYear();
    this.dropdownYear.push(year);

    for (let i = 1; i < 100; i++) {
      this.dropdownYear.push(year + i);
    }

    this.dropdownSettings = {
      singleSelection: false,
      selectAllYear: 'Select All',
      unSelectAllYear: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

    this.currentExamId= this._route.snapshot.paramMap.get('id');
    console.log("currentExamId is :", this.currentExamId);
    // console.log("user details ", this.userService.getUserInfoFromLocalstorage());
    // this.userName = this.userService.getUserInfoFromLocalstorage().userDetails.name;
    // this.authToken = this.userService.getUserInfoFromLocalstorage().authToken;

    // this.currentExam=this.examService.getExamDetails(currentExamId).subscribe(
    //   apiResponse =>{
    //     console.log ("logging data",apiResponse);
    //     // console.log(data);
    //     this.currentExam=apiResponse.executed_exam;
    //     console.log("current site details is :", this.currentExam);
    //     //this.toastr.successToastr('This is success toast.', 'Success!');

    //   },

    //   error =>{
    //     console.log ("some error message occured");
    //     console.log(error.errorMessage);
    //     this.toastr.errorToastr('This is error toast.', 'Oops!');

        
    //   }
    // )
    this.getAllInfoOfExam(this.currentExamId);
  }

  onCkeChange($event: any): void {
    //console.log("onChange",$event);

  }

  onYearSelect(year: any) {
    console.log(year);
  }
  onSelectAll(years: any) {
    console.log(years);
  }

  public goToExamination(): any {
    this.router.navigate(['/examination']);
  }

  // public editExam():any{
  //   this.examService.editExam(this.currentExam.id,this.currentExam).subscribe(
  //     apiResponse =>{
        
  //       console.log(apiResponse);
  //       this.toastr.successToastr('exam edited .', 'Success!');

        
  //       setTimeout(()=>{
  //         this.router.navigate(['/examination']);
  //       },1000)
  //     },

  //     error =>{
  //       console.log ("some error message occured");
  //       console.log(error.errorMessage);
  //       this.toastr.errorToastr('This is error toast.', 'Oops!');

        
  //     }
  //   )
  // }

  public getAllInfoOfExam = (currentExamId) => {
    this.examService.getExamDetails(currentExamId).subscribe((apiResponse) =>{
      if(apiResponse.response_status_code === 200){
        console.log("apiresponse for get all info of a exam ",apiResponse.executed_exam )
        this.examName = apiResponse.executed_exam.name;
        this.image = apiResponse.executed_exam.image;
        this.phaseNumber = apiResponse.executed_exam.phase_count;
        this.examYear = apiResponse.executed_exam.years;
        this.status = apiResponse.executed_exam.status;
        this.aboutExam = apiResponse.executed_exam.about;
        this.examPattern = apiResponse.executed_exam.exam_pattern;
        this.Syllabus = apiResponse.executed_exam.syllabus;
        if(apiResponse.executed_exam.phase_count == 1){
          for (let x of apiResponse.executed_exam.phase){
            this.weightageOfExam = x.weightage
          }
           
        } else if(apiResponse.executed_exam.phase_count == 2){
          // for (let x of apiResponse.executed_exam.phase){
            this.phaseName1 = apiResponse.executed_exam.phase[0].name
            this.weightageOfPhase1 = apiResponse.executed_exam.phase[0].weightage
            this.phaseName2 = apiResponse.executed_exam.phase[1].name
            this.weightageOfPhase2 = apiResponse.executed_exam.phase[1].weightage
          // }

        } else if(apiResponse.executed_exam.phase_count == 3){
            this.phaseName1 = apiResponse.executed_exam.phase[0].name
            this.weightageOfPhase1 = apiResponse.executed_exam.phase[0].weightage
            this.phaseName2 = apiResponse.executed_exam.phase[1].name
            this.weightageOfPhase2 = apiResponse.executed_exam.phase[1].weightage
            this.phaseName3 = apiResponse.executed_exam.phase[2].name
            this.weightageOfPhase3 = apiResponse.executed_exam.phase[2].weightage
        }
      }
      else {
        this.toastr.errorToastr("no exam details found with this id");
      }
    })
  }


  public editExam = () => {

    // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    // let examImageFileCount: number = inputEl.files.length;
    // let examImageFile = inputEl.files[0];

    //console.log('file here is', examImageFile)


    var phaseObjForPhase1 = [{
      name: this.examName,
      weightage: this.weightageOfExam
    }];

    let phaseObjForPhase2 = [{
      name: this.phaseName1,
      weightage: this.weightageOfPhase1
    },
    {
      name: this.phaseName2,
      weightage: this.weightageOfPhase2
    }];

    let phaseObjForPhase3 = [{
      name: this.phaseName1,
      weightage: this.weightageOfPhase1
    },
    {
      name: this.phaseName2,
      weightage: this.weightageOfPhase2
    },
    {
      name: this.phaseName3,
      weightage: this.weightageOfPhase3
    }]
    let currentFormData = new FormData();
    currentFormData.append('name', this.examName);
    currentFormData.append('about', this.aboutExam);
    currentFormData.append('exam_pattern', this.examPattern);
    currentFormData.append('syllabus', this.Syllabus);
    //currentFormData.append('number_of_phases', this.phaseNumber);
    currentFormData.append('year', this.examYear);
    //currentFormData.append('weightage_phase1', this.issueReporterEmail);
    currentFormData.append('status', this.status);
    //currentFormData.append('year', this.issueAssigneeName);
    if (this.phaseNumber == 3) {
      var data = { "phases": phaseObjForPhase3 };
    } else if (this.phaseNumber == 2) {
      var data = { "phases": phaseObjForPhase2 };
    } else if (this.phaseNumber == 1) {
      var data = { "phases": phaseObjForPhase1 };
    }
    

    
    // if (examImageFileCount > 0) { // a file was selected
    //   for (let i = 0; i < examImageFileCount; i++) {
    //     currentFormData.append('image_url', inputEl.files[i]);

    //     console.log('formData is', currentFormData)

    //   }
    // }

    let jsonObject = {};

    console.log("form data entries is", currentFormData.entries());

    for (const [key, value] of currentFormData.entries()) {
      jsonObject[key] = value;
    }

    var dataObj = { ...jsonObject, ...data }

    console.log("object is", jsonObject)
      this.examService.editExam(this.currentExamId,dataObj).subscribe(
        data => {
          console.log('edited  data is: ', data)
          this.toastr.successToastr("exam edited")
          setTimeout(() => {
            this.router.navigate(['/examination']);
          }, 1000)

        },
        error => {
          console.log('error to test ', error)
          this.toastr.errorToastr("some error occured");
          setTimeout(() => {
            this.router.navigate(['/examination']);
          }, 1000)
        }
      )

      //this.toCheckCreateFunTemp(formData)

    // } 
    // else {
    //   this.toastr.errorToastr("upload a file to edit issue");
    // }



    // console.log("assisngee", this.issueAssigneeEmail)
    // console.log("reporter", this.issueReporterEmail)
    // console.log("status", this.issueStatus)
  }

  public goBack(): any {
    this.location.back();
  }

  ngOnDestroy(){
  }

}
