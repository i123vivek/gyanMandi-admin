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
  selector: 'app-add-test-series',
  templateUrl: './add-test-series.component.html',
  styleUrls: ['./add-test-series.component.css'],
  providers: [Location]
})
export class AddTestSeriesComponent implements OnInit, OnDestroy {

  public testSeriesList = [
    {
      InstituteName : "Akash",
      examList :[
        {
          examName: "IIT JEE",
          examYear: ["2020","2021","2022"]
        },
        {
          examName: "GATE",
          examYear: ["2021","2022","2023"]
        },
        {
          examName: "MAT",
          examYear: ["2022","2023","2024"]
        }
      ]
    },
    {
      InstituteName : "Prerna",
      examList :[
        {
          examName: "GATE",
          examYear: ["2020","2021","2022"]
        },
        {
          examName: "IIT JEE",
          examYear: ["2021","2022","2023"]
        },
        {
          examName: "MAT",
          examYear: ["2022","2023","2024"]
        }
      ]
    },
    {
      InstituteName : "Bansal",
      examList :[
        {
          examName: "IIT JEE",
          examYear: ["2020","2021","2022"]
        },
        {
          examName: "MAT",
          examYear: ["2021","2022","2023"]
        },
        {
          examName: "GATE",
          examYear: ["2022","2023","2024"]
        }
      ]
    }
  ]
  addTestSeriesForm: FormGroup;
  instituteName: any;
  examList: any = [];
  selectedExamName: any;
  examYearList: any = [];
  today =  this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  ckeConfig: any;
  

  constructor(private fb: FormBuilder, public datepipe: DatePipe, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: false,
      //,easyimage
      extraPlugins: 'mathjax',
      removePlugins :'image',
      mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      forcePasteAsPlainText: true,
      pasteFromWordRemoveFontStyles: true,
      //cloudServices_tokenUrl:'YOUR_TOKEN_URL',
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

    this.addTestSeriesForm = this.fb.group({
      instituteName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      examName: ['',Validators.required],
      examYear: ['',Validators.required],
      testSeries: this.fb.group({
        testSeriesName: ['',Validators.required],
        testSeriesImage: ['',Validators.required],
        testSeriesPrice: ['',Validators.required],
        noOfTests: ['',Validators.required],
        noOfFreeTest: ['',Validators.required],
        noOfMockTest: ['',Validators.required],
        noOfLiveTest: ['',Validators.required],
        description: ['',Validators.required],
        descriptionPdf: [''],
        timeTable: ['',Validators.required],
        timeTablePdf: [''],
        showCalculator: ['',Validators.required],
        language: ['',Validators.required],
        status: ['',Validators.required],  
        todayDate :  [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],      
        startDate: [null,Validators.required],
        endDate: [null,Validators.required]      
      }
      , {validator: Validators.compose([
        compareStartDateValidator('todayDate', 'startDate'),
        compareEndDateValidator('startDate', 'endDate')
      ]) }
      )
    })
  }

  onCkeChange($event: any): void {
    console.log("onChange",$event);
    
  }


  get description(){
    return this.addTestSeriesForm.get(['testSeries','description']).value;
  }

  selectedInstitute(event) {
    this.instituteName = event.target.value;
    console.log("InstituteName is", this.instituteName);
    this.examList = [];
    for (let x of this.testSeriesList) {
      if (x.InstituteName == this.instituteName) {
        this.examList.push(...x.examList);
        console.log("examlist is :",this.examList);
      }
    }
  }

  selectedExam(event){
    this.selectedExamName = event.target.value;
    console.log("selected exam name is",this.selectedExamName);
    this.examYearList = [];

    for(let y of this.examList){
      if(y.examName == this.selectedExamName){
        this.examYearList.push(...y.examYear);
        console.log("exam year of selected exam is", this.examYearList);
      }
    }
  }

  get startDate(){
    return this.addTestSeriesForm.get(['testSeries','startDate']);
  }

  get endDate(){
    return this.addTestSeriesForm.get(['testSeries','endDate']);
  }


  public goToTestSeries(): any {
    this.router.navigate(['/test-series']);
  }

  public goBack(): any {
    this.location.back();
  }

  onSubmit() {
    console.log(this.addTestSeriesForm.value);
    console.log("discription value",this.description.replace(/<[^>]*>/g, ''))
  }

  ngOnDestroy(){}

}
