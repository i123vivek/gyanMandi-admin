import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DOCUMENT,DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";
import { compareEndDateValidator, compareStartDateValidator } from 'src/app/compare-date';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css'],
  providers: [Location]
})
export class AddClassroomComponent implements OnInit, OnDestroy {

  public instituteList = [
    {
      instituteName: "Akash",
      examList: [
        {
          examName: "IIT JEE",
          examDetails: [
            {
              examYear : "2020",
              examPhaseName: ["phaseName1", "phaseName2", "phaseName3"]
            },
            {
              examYear : "2021",
              examPhaseName: ["phaseName2", "phaseName3"]
            }
          ]
        },
        {
          examName: "AIEEE",
          examDetails: [
            {
              examYear : "2022",
              examPhaseName: ["phaseName1", "phaseName2"]
            },
            {
              examYear : "2023",
              examPhaseName: ["phaseName2", "phaseName3"]
            }
          ]
        }
      ]
    },
    {
      instituteName: "Prerna",
      examList: [
        {
          examName: "IIT JEE",
          examDetails: [
            {
              examYear : "2020",
              examPhaseName: ["phaseName1", "phaseName2", "phaseName3"]
            },
            {
              examYear : "2021",
              examPhaseName: ["phaseName2", "phaseName3"]
            }
          ]
        },
        {
          examName: "AIEEE",
          examDetails: [
            {
              examYear : "2022",
              examPhaseName: ["phaseName1", "phaseName2"]
            },
            {
              examYear : "2023",
              examPhaseName: ["phaseName2", "phaseName3"]
            }
          ]
        }
      ]
    }
  ]
  addClassRoomForm: FormGroup;
  instituteName: any;
  examList: any[];
  selectedExamName: any;
  examDetailList: any[];
  selectedExamYear: any;
  examPhaseList: any[];

  constructor(private fb: FormBuilder, public datepipe: DatePipe, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    this.addClassRoomForm = this.fb.group({
      instituteName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      examName: ['',Validators.required],
      examYear: ['',Validators.required],
      examPhase: ['', Validators.required],
      batchName: ['',Validators.required]
    })
  }

  selectedInstitute(event) {
    this.instituteName = event.target.value;
    console.log("InstituteName is", this.instituteName);
    this.examList = [];
    for (let x of this.instituteList) {
      if (x.instituteName == this.instituteName) {
        this.examList.push(...x.examList);
        console.log("examlist is :",this.examList);
      }
    }
  }

  selectedExam(event){
    this.selectedExamName = event.target.value;
    console.log("selected exam name is",this.selectedExamName);
    this.examDetailList = [];

    for(let y of this.examList){
      if(y.examName == this.selectedExamName){
        this.examDetailList.push(...y.examDetails);
        console.log("exam details of selected exam is", this.examDetailList);
      }
    }
  }

  selectedExamYearFun(event){
    this.selectedExamYear = event.target.value;
    console.log("selected exam year is",this.selectedExamYear);
    this.examPhaseList = [];

    for(let z of this.examDetailList){
      if(z.examYear == this.selectedExamYear){
        this.examPhaseList.push(...z.examPhaseName);
        console.log("exam phase name  of selected exam on selected year is", this.examPhaseList);
      }
    }
  }


  public goToClassroom(): any {
    this.router.navigate(['/classroom']);
  }

  public goBack(): any {
    this.location.back();
  }

  onSubmit() {
    console.log(this.addClassRoomForm.value);
  }

  ngOnDestroy(){
  }

}
