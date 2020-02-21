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
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [Location]
})
export class AddStudentComponent implements OnInit, OnDestroy {

  public studentExamDetailsList = [
    {
      instituteName: "Akash",
      examList: [
        {
          examName: "IIT JEE",
          examDetails: [
            {
              examYear: "2020",
              examPhaseDetails: [
                {
                  examPhaseName: "phase1",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase2",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            },
            {
              examYear: "2021",
              examPhaseDetails: [
                {
                  examPhaseName: "phase3",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase4",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            }
          ]
        },
        {
          examName: "AIEEE",
          examDetails: [
            {
              examYear: "2020",
              examPhaseDetails: [
                {
                  examPhaseName: "phase1",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase2",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            },
            {
              examYear: "2021",
              examPhaseDetails: [
                {
                  examPhaseName: "phase3",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase4",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
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
              examYear: "2020",
              examPhaseDetails: [
                {
                  examPhaseName: "phase1",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase2",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            },
            {
              examYear: "2021",
              examPhaseDetails: [
                {
                  examPhaseName: "phase3",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase4",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            }
          ]
        },
        {
          examName: "AIEEE",
          examDetails: [
            {
              examYear: "2020",
              examPhaseDetails: [
                {
                  examPhaseName: "phase1",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase2",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            },
            {
              examYear: "2021",
              examPhaseDetails: [
                {
                  examPhaseName: "phase3",
                  otherDetails: {
                    classroomBatch: ["B1","B2","B3"],
                    testSeriesName: ["T1","T2","T3"]
                  }
                },
                {
                  examPhaseName: "phase4",
                  otherDetails: {
                    classroomBatch: ["B4","B5","B6"],
                    testSeriesName: ["T4","T5","T6"]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  addStudentForm: FormGroup;
  instituteName: any;
  examList: any[];
  selectedExamName: any;
  examDetailList: any[];
  selectedExamYear: any;
  examPhaseList: any[];
  selectedExamPhase: any;
  classroomBatchList: any[];
  testSeriesName: any[];
  csvList: any[];

  constructor(private fb: FormBuilder,private papa: Papa, public datepipe: DatePipe, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    this.addStudentForm = this.fb.group({
      instituteName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      studentInstituteId: ['',Validators.required],
      studentName: ['',Validators.required],
      studentMobileNumber: ['', Validators.required],
      emailAddress: ['',Validators.required],
      examName: ['',Validators.required],
      examYear: ['',Validators.required],
      examPhase: ['',Validators.required],
      classroomBatch: ['',Validators.required],
      productType: ['',Validators.required],
      productName: ['',Validators.required],
      dateOfJoining: ['',Validators.required]
    })

    console.log("date of joining is", this.dateOfJoiningFun);
  }

  get dateOfJoiningFun() {
    return this.addStudentForm.get('dateOfJoining').value;
  }


  selectedInstitute(event) {
    this.instituteName = event.target.value;
    console.log("InstituteName is", this.instituteName);
    this.examList = [];
    for (let x of this.studentExamDetailsList) {
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
        this.examPhaseList.push(...z.examPhaseDetails);
        console.log("exam phase name  of selected exam on selected year is", this.examPhaseList);
      }
    }
  }

  selectedExamPhaseFun(event){
    this.selectedExamPhase = event.target.value;
    console.log("selected exam Phase is",this.selectedExamPhase);
    this.classroomBatchList = [];
    this.testSeriesName = [];

    for(let i of this.examPhaseList){
      if(i.examPhaseName == this.selectedExamPhase){
        this.classroomBatchList.push(...i.otherDetails.classroomBatch);
        this.testSeriesName.push(...i.otherDetails.testSeriesName);
        console.log("list of classroom is", this.classroomBatchList);
        console.log("list of testSeries Name is", this.testSeriesName);
      }
    }
  }



  ConvertCSVtoJSON() {
    console.log(JSON.stringify(this.csvList));
    // console.log(this.test);
  }
  //test = [];
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          console.log("result data is ", results.data);
          this.csvList = [];
          for (let i = 0; i < results.data.length; i++) {
            let orderDetails = {
              instituteName: results.data[i].InstituteName,
              studentId: results.data[i].StudetnID,
              studentName: results.data[i].StudentName,
              mobile: results.data[i].Mobile,
              email: results.data[i].EmailID,
              examName: results.data[i].ExamName,
              examyear: results.data[i].Examyear,
              examPhase: results.data[i].ExamPhase


              //instituteName: results.data[i].InstituteName,
              //studentInstituteId: results.data[i].StudentInstituteId,
              //studentName: results.data[i].StudentName,
              //studentMobileNumber: results.data[i].Mobile,
              //emailAddress: results.data[i].EmailID,
              // examName: results.data[i].ExamName,
              // examYear: results.data[i].Examyear,
              // examPhase: results.data[i].ExamPhase,
              // classroomBatch: results.data[i].Batch,
              // productType: results.data[i].ProductType,
              // productName: results.data[i].ProductName,
              // dateOfJoining: results.data[i].DateOfJoining

            };
           this.csvList.push(orderDetails);
          }
          // console.log(this.test);
          // console.log('Parsed: k', results.data);
          this.ConvertCSVtoJSON();
        }
      });
    }
  }




  public goToStudent(): any {
    this.router.navigate(['/classroom']);
  }

  public goBack(): any {
    this.location.back();
  }

  onSubmit() {
    console.log(this.addStudentForm.value);
  }

  ngOnDestroy(){
  }

}
