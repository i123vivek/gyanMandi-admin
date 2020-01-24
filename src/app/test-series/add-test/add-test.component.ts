import { Component, OnInit, OnDestroy, Renderer2, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Location]
})
export class AddTestComponent implements OnInit, OnDestroy {

  public testList= [
    {
      InstituteName : "Akash",
      examList:[
        {
          examName:"IITJEE",
          testSeriesList:[
            {
              year: 2020,
              testSeriesName: ["testSeries1","testSeries2","testSeries3"]
            },
            {
              year: 2021,
              testSeriesName: ["testSeries4","testSeries5","testSeries6"]
            }
          ]
        },
        {
          examName:"GATE",
          testSeriesList:[
            {
              year: 2022,
              testSeriesName: ["tSeries1","tSeries2","tSeries3"]
            },
            {
              year: 2023,
              testSeriesName: ["tSeries4","tSeries5","tSeries6"]
            }
          ]
        }
      ]
    },
    {
      InstituteName : "Prerna",
      examList:[
        {
          examName:"MAT",
          testSeriesList:[
            {
              year: 2020,
              testSeriesName: ["testSeries1","testSeries2","testSeries3"]
            },
            {
              year: 2021,
              testSeriesName: ["testSeries4","testSeries5","testSeries6"]
            }
          ]
        },
        {
          examName:"CAT",
          testSeriesList:[
            {
              year: 2022,
              testSeriesName: ["tSeries1","tSeries2","tSeries3"]
            },
            {
              year: 2023,
              testSeriesName: ["tSeries4","tSeries5","tSeries6"]
            }
          ]
        }
      ]
    }
  ]
  addTestForm: FormGroup;
  instituteName: any;
  examList: any[];
  selectedExamName: any;
  testSeriesList: any[];
  selectedYearData: any;
  testSeriesNameList: any[];

  public startAt = new Date();
  public currentYear = new Date().getFullYear();
  public month = new Date().getMonth();
  public day = new Date().getDate();

  public min: any;
  public max: any;
  selectedStartDateAndTime: any;
  ckeConfig: any;

  constructor(private fb: FormBuilder, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea,mathjax,easyimage',
      mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      forcePasteAsPlainText: true,
      pasteFromWordRemoveFontStyles: true,
      cloudServices_tokenUrl:'YOUR_TOKEN_URL',
      // cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
      // cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/',

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

    this.addTestForm = this.fb.group({
      instituteName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      examName: [''],
      year: [''],
      testSeries: [''],
      //test: this.fb.group({
        testName: [''],
        positionOfTest: [''],
        paymentMode: [''],
        testType: [''],
        liveTest: [''],
        durationOfTest: [''],
        startDateAndTime:[''],
        endDateAndTime:[''],
        syllabus:[''],
        noOfQuestion:[''],
        totalMarks: [''],
        resumeTest: [''],
        instruction: [''],
        instructionPdf:[''],
        generalInstruction:[''],
        generalInstructionPdf:[''],
        language: [''],
        status:[''],
        sectionOfTest:[''],
        timeConstraint:[''],
        sectionNameArray: this.fb.array([
          this.fb.control('')
        ]),
        durationSectionArray: this.fb.array([
          this.fb.control('')
        ]),
        showUsefulData:[''],
        usefulData:[''],
        usefulDataPdf:['']

      //})
    })
  }

  onCkeChange($event: any): void {
    console.log("onChange",$event);
    
  }

  get startDateAndTime(){
    return this.addTestForm.get('startDateAndTime');
  }

  get showUsefulData(){
    return this.addTestForm.get('showUsefulData');
  }

  selectedInstitute(event) {
    this.instituteName = event.target.value;
    console.log("InstituteName is", this.instituteName);
    this.examList = [];
    for (let x of this.testList) {
      if (x.InstituteName == this.instituteName) {
        this.examList.push(...x.examList);
        console.log("examlist is :",this.examList);
      }
    }
  }

  selectedExam(event){
    this.selectedExamName = event.target.value;
    console.log("selected exam name is",this.selectedExamName);
    this.testSeriesList = [];

    for(let y of this.examList){
      if(y.examName == this.selectedExamName){
        this.testSeriesList.push(...y.testSeriesList);
        console.log("test series list of selected exam is", this.testSeriesList);
      }
    }
  }

  selectedYear(event){
    this.selectedYearData = event.target.value;
    console.log("selected exam name is",this.selectedYearData);
    this.testSeriesNameList = [];

    for(let y of this.testSeriesList){
      if(y.year == this.selectedYearData){
        this.testSeriesNameList.push(...y.testSeriesName);
        console.log("test series Name list of selected exam is", this.testSeriesNameList);
      }
    }
    this.setMinAndMaxStartDate(this.selectedYearData,this.currentYear);
  }

  setMinAndMaxStartDate(selectedYearData,currentYear){
    if(selectedYearData == currentYear){
      this.min = new Date(currentYear,this.month,this.day);
      this.max = new Date(currentYear,11,31) ;
    } else if(selectedYearData > currentYear){
      this.min = new Date(selectedYearData,0,1);
      this.max = new Date(selectedYearData,11,31) ;
    }

  }

  onSubmit() {
    console.log(this.addTestForm.value);
    //console.log("discription value",this.description.replace(/<[^>]*>/g, ''))
  }

  public goBack(): any {
    this.location.back();
  }

  ngOnDestroy(){
  }

}
