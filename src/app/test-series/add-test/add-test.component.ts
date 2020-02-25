import { Component, OnInit, OnDestroy, Renderer2, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";
import { TestService } from 'src/app/test.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Location,TestService]
})
export class AddTestComponent implements OnInit, OnDestroy {

  dropdownEnabled = true;
  items: TreeviewItem[];
  values: [];
  config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: false,
      hasCollapseExpand: false,
      decoupleChildFromParent: false,
      maxHeight: 200
  });

  public testList = [
    {
      InstituteName: "Akash",
      examList: [
        {
          examName: "IITJEE",
          testSeriesList: [
            {
              year: 2020,
              testSeriesName: ["testSeries1", "testSeries2", "testSeries3"]
            },
            {
              year: 2021,
              testSeriesName: ["testSeries4", "testSeries5", "testSeries6"]
            }
          ]
        },
        {
          examName: "GATE",
          testSeriesList: [
            {
              year: 2022,
              testSeriesName: ["tSeries1", "tSeries2", "tSeries3"]
            },
            {
              year: 2023,
              testSeriesName: ["tSeries4", "tSeries5", "tSeries6"]
            }
          ]
        }
      ]
    },
    {
      InstituteName: "Prerna",
      examList: [
        {
          examName: "MAT",
          testSeriesList: [
            {
              year: 2020,
              testSeriesName: ["testSeries1", "testSeries2", "testSeries3"]
            },
            {
              year: 2021,
              testSeriesName: ["testSeries4", "testSeries5", "testSeries6"]
            }
          ]
        },
        {
          examName: "CAT",
          testSeriesList: [
            {
              year: 2022,
              testSeriesName: ["tSeries1", "tSeries2", "tSeries3"]
            },
            {
              year: 2023,
              testSeriesName: ["tSeries4", "tSeries5", "tSeries6"]
            }
          ]
        }
      ]
    }
  ];

  public syllabusList = [
    {
      syllabusName: "syllabus1",
      topicArray: ["topic1","topic2"]
    },
    {
      syllabusName: "syllabus2",
      topicArray: ["topic3","topic4"]
    },
    {
      syllabusName: "syllabus3",
      topicArray: ["topic5","topic6"]
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
  sections: FormArray;

  dropdownSyllabus = [];
  dropdownLanguage = [];
  dropdownSettings = {};

   expanded = false;
  public submitted: boolean = false;
  buttonClass: any;

  constructor(private fb: FormBuilder, private service: TestService, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea,mathjax,easyimage',
      mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      forcePasteAsPlainText: true,
      pasteFromWordRemoveFontStyles: true,
      cloudServices_tokenUrl: 'YOUR_TOKEN_URL',
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

    this.items = this.service.getSyllabus();

  

    this.dropdownLanguage = ["Hindi", "English", "Gujarati", "French"]

    this.dropdownSettings = {
      singleSelection: false,
      selectAllLanguage: 'Select All',
      unSelectAllLanguage: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

    this.addTestForm = this.fb.group({
      instituteName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      examName: [''],
      year: [''],
      testSeries: [''],
      //test: this.fb.group({
      testName: [''],
      positionOfTest: [''],
      paidTest: [''],
      testType: [''],
      liveTest: [''],
      durationOfTest: [''],
      startDateAndTime: [''],
      endDateAndTime: [''],
      // syllabus: [''],
      // topic:[''],
      noOfQuestion: [''],
      totalMarks: [''],
      resumeTest: [''],
      instruction: [''],
      instructionPdf: [''],
      generalInstruction: [''],
      generalInstructionPdf: [''],
      language: [''],
      status: [''],
      sectionOfTest: ['No'],
      timeConstraint: ['No'],
      sectionArray: new FormArray([]),
      
      showUsefulData: [''],
      usefulData: [''],
      usefulDataPdf: ['']

      //})
    })
  }

  onLanguageSelect(Language: any) {
    console.log(Language);
  }
  onSelectAll(Languages: any) {
    console.log(Languages);
  }

  onCkeChange($event: any): void {
    console.log("onChange", $event);

  }


  showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

  //   createSection(): FormGroup {
  //     return this.fb.group({
  //       sectionName: '',
  //       sectionDuration: ''
  //     });
  //  }

  get f() { return this.addTestForm.controls; }
  get t() { return this.f.sectionArray as FormArray; }

  onSelectedSectionOption(e) {
    const selectedSectionOption = e.target.value;
    console.log("selecte option is:", selectedSectionOption)
    this.t.clear();
    if (selectedSectionOption == 'Yes' && this.timeConstraint.value == 'No') {
      for (let i = 0; i < 2; i++) {
        this.t.push(this.fb.group({
          sectionName: ['']
        }))
      }
    } else if (selectedSectionOption == 'Yes' && this.timeConstraint.value == 'Yes') {
      for (let i = 0; i < 2; i++) {
        this.t.push(this.fb.group({
          sectionName: [''],
          sectionDuration: ['']
        }))
      }
    } else{
      this.addTestForm.patchValue({
        sectionOfTest: ['No'],
        timeConstraint: ['No']
      })
    }
  }

  onSelectedChange(e){
    console.log("value of e is",e);
    for(let x of this.items){
      if(x.indeterminate == true || x.checked == true){
        console.log("item is",x.text)
      }
      //  console.log("item is",x)
    }
  }

  onSelectedDurationOption(e) {
    const selectedDurationOption = e.target.value;
    console.log("selecte option is:", selectedDurationOption)
    this.t.clear();
    if (selectedDurationOption == 'Yes' && this.sectionOfTest.value == 'Yes') {
      for (let i = 0; i < 2; i++) {
        this.t.push(this.fb.group({
          sectionName: [''],
          sectionDuration: ['']
        }))
      }
    } else if(selectedDurationOption == 'No' && this.sectionOfTest.value == 'Yes'){
      for (let i = 0; i < 2; i++) {
        this.t.push(this.fb.group({
          sectionName: ['']
        }))
      }
    } else{
      this.addTestForm.patchValue({
        sectionOfTest: ['No'],
        timeConstraint: ['No']
      })
    }
  }

  addSection(): void {
    // this.sections = this.f.sectionArray as FormArray;
    // this.sections.push(this.createAddress());
    if (this.timeConstraint.value == 'Yes' && this.sectionOfTest.value == 'Yes') {
      this.t.push(this.fb.group({
        sectionName: [''],
        sectionDuration: ['']
      }))
    } else if(this.timeConstraint.value == 'No' && this.sectionOfTest.value == 'Yes') {
      this.t.push(this.fb.group({
        sectionName: ['']
      }))
    }
  }

  deleteSection(index) {
    this.t.removeAt(index);
  }

  get startDateAndTime() {
    return this.addTestForm.get('startDateAndTime');
  }

  get sectionOfTest() {
    return this.addTestForm.get('sectionOfTest');
  }

  get timeConstraint() {
    return this.addTestForm.get('timeConstraint');
  }

  get showUsefulData() {
    return this.addTestForm.get('showUsefulData');
  }

  selectedInstitute(event) {
    this.instituteName = event.target.value;
    console.log("InstituteName is", this.instituteName);
    this.examList = [];
    for (let x of this.testList) {
      if (x.InstituteName == this.instituteName) {
        this.examList.push(...x.examList);
        console.log("examlist is :", this.examList);
      }
    }
  }

  selectedExam(event) {
    this.selectedExamName = event.target.value;
    console.log("selected exam name is", this.selectedExamName);
    this.testSeriesList = [];

    for (let y of this.examList) {
      if (y.examName == this.selectedExamName) {
        this.testSeriesList.push(...y.testSeriesList);
        console.log("test series list of selected exam is", this.testSeriesList);
      }
    }
  }

  selectedYear(event) {
    console.log("selected exam name is", this.selectedYearData);
    this.selectedYearData = event.target.value;
    // console.log("selected exam name is", this.selectedYearData);
    this.testSeriesNameList = [];

    for (let y of this.testSeriesList) {
      if (y.year == this.selectedYearData) {
        this.testSeriesNameList.push(...y.testSeriesName);
        console.log("test series Name list of selected exam is", this.testSeriesNameList);
      }
    }
    this.setMinAndMaxStartDate(this.selectedYearData, this.currentYear);
  }

  setMinAndMaxStartDate(selectedYearData, currentYear) {
    if (selectedYearData == currentYear) {
      this.min = new Date(currentYear, this.month, this.day);
      this.max = new Date(currentYear, 11, 31);
    } else if (selectedYearData > currentYear) {
      this.min = new Date(selectedYearData, 0, 1);
      this.max = new Date(selectedYearData, 11, 31);
    }

  }

  onSubmit() {
    console.log(this.addTestForm.value);
    //console.log("discription value",this.description.replace(/<[^>]*>/g, ''))
  }

  public goBack(): any {
    this.location.back();
  }

  ngOnDestroy() {
  }

}
