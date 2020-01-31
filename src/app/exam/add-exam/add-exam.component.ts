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
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
  providers: [Location]
})
export class AddExamComponent implements OnInit, OnDestroy {

  public uploader: FileUploader = new FileUploader({});
  public phases: number[];
  public examName: string | Blob;
  public examYear: any;
  public status: any = 'active';
  public phaseNumber: any;
  public weightageOfExam: string | Blob;
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


  constructor(public examService: ExamService, private location: Location, public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private el: ElementRef) { }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: false,
      //,easyimage
      extraPlugins: 'divarea,mathjax',
      mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      forcePasteAsPlainText: true,
      pasteFromWordRemoveFontStyles: true,

      // cloudServices_tokenUrl:'YOUR_TOKEN_URL',
      //cloudServices_uploadUrl:'YOUR_UPLOAD_URL',

    //   cloudServices: {
    //     tokenUrl: 'http://localhost:4200/',
    //     uploadUrl: 'http://localhost:3000/easyimage/upload/'
    // },
    
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

    this.phases = [1,2,3];

    var year = new Date().getFullYear();
    this.dropdownYear.push(year);

    for (let i = 1; i < 100; i++) {
      this.dropdownYear.push(year+i);
    }

    this.dropdownSettings = {
      singleSelection: false,
      selectAllYear: 'Select All',
      unSelectAllYear: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

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

  public addExam = () => {

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    // let inputElP: HTMLInputElement = this.el.nativeElement.querySelector('#pattern');
    // let inputElS: HTMLInputElement = this.el.nativeElement.querySelector('#syllabus');
    // let inputElA: HTMLInputElement = this.el.nativeElement.querySelector('#about');
    let examImageFileCount: number = inputEl.files.length;
    // let examPatternFileCount: number = inputElP.files.length;
    // let examSyllabusFileCount: number = inputElS.files.length;
    // let aboutExamFileCount: number = inputElA.files.length;
    let examImageFile = inputEl.files[0];
    // let examPatternFile = inputElP.files[0];
    // let examSyllabusFile = inputElS.files[0];
    // let aboutExamFile = inputElA.files[0];
    let phaseObjForPhase1 = JSON.stringify({
      phase_name: this.examName,
      weightage: this.weightageOfExam
    });

    let phaseObjForPhase2 = JSON.stringify([{
      phase_name: this.phaseName1,
      weightage: this.weightageOfPhase1
    },
    {
      phase_name: this.phaseName2,
      weightage: this.weightageOfPhase2
    }]);

    let phaseObjForPhase3 = JSON.stringify([{
      phase_name: this.phaseName1,
      weightage: this.weightageOfPhase1
    },
    {
      phase_name: this.phaseName2,
      weightage: this.weightageOfPhase2
    },
    {
      phase_name: this.phaseName3,
      weightage: this.weightageOfPhase3
    }])


    console.log('exam image file here is', examImageFile);
    // console.log('exam pattern pdf file here is', examPatternFile);
    // console.log('exam syllabus pdf file here is', examSyllabusFile);
    // console.log('about exam pdf file here is', aboutExamFile);

    let formData = new FormData();

    formData.append('name', this.examName);
    formData.append('year', this.examYear);
    formData.append('status', this.status);
    formData.append('pattern_txt', this.examPattern);
    formData.append('syllabus_txt', this.Syllabus);
    formData.append('about_txt', this.aboutExam);
    //formData.append('phaseNumber',this.phaseNumber);
    //formData.append('phase', phaseObjForPhase2)
    if (this.phaseNumber == 3) {
      formData.append('phase', phaseObjForPhase3)
    } else if (this.phaseNumber == 2) {
      formData.append('phase', phaseObjForPhase2)
    } else if (this.phaseNumber == 1) {
      formData.append('phase', phaseObjForPhase1)
    }

    if (examImageFileCount > 0) {
      for (let i = 0; i < examImageFileCount; i++) {
        formData.append('image', inputEl.files[i]);
      }
    }
    // if (examPatternFileCount > 0) {
    //   for (let i = 0; i < examPatternFileCount; i++) {
    //     formData.append('pattern_pdf', inputElP.files[i]);
    //   }
    // }
    // if (examSyllabusFileCount > 0) {
    //   for (let i = 0; i < examSyllabusFileCount; i++) {
    //     formData.append('syllabus_pdf', inputElS.files[i]);
    //   }
    // }
    // if (aboutExamFileCount > 0) {
    //   for (let i = 0; i < aboutExamFileCount; i++) {
    //     formData.append('about_pdf', inputElA.files[i]);
    //   }
    // }


    this.examService.createExam(formData).subscribe(
      data => {
        console.log('data to add exam', data);
        this.toastr.successToastr("exam added")
        //this.router.navigate(['/examination']);
      },
      error => {
        console.log('error to add exam ', error)
        this.toastr.errorToastr("some error occured");
        //this.router.navigate(['/examination']);
      }
    )
  }

  public goBack(): any {
    this.location.back();
  }

  ngOnDestroy() {
  }


}
