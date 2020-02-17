import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";
import { ExamService } from 'src/app/exam.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
  providers: [Location]
})
export class AddSubjectComponent implements OnInit, OnDestroy {

  public examList = [];
  phaseNumber: any;
  examName: any;
  addSubjectForm: FormGroup;
  submitted: boolean;
  subForm: FormGroup;
  examId: any;

  constructor(private fb: FormBuilder, public examService: ExamService, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    var div = document.getElementById('exForm');
    var btn = document.getElementById('topicButton');
    btn.onclick = function (e) {
      let elements = div.querySelectorAll('input, select, textarea, checkbox, radio, button');

      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'true');
      }
    }

    //console.log("initial exam list",this.examList)

    this.addSubjectForm = this.fb.group({
      examId: ['',Validators.required],
      examName: ['', Validators.required],
      phaseNumber: ['', Validators.required],
      subjectArray: this.fb.array([this.createSubjectForm()])
    })

    this.getExamList();
  }

  createSubjectForm(): FormGroup {
    return this.subForm = this.fb.group({
      subjectName: ['', Validators.required],
      weightages: this.fb.array([

      ])

    })
  }

  public getExamList:any = () =>{
    this.examList= [];
    
      this.examService.getExamList().subscribe((apiResponse) =>{
        //console.log("api response for getting exam list", apiResponse)
        for(let x of apiResponse){
          if(this.examList.length == 0){
            let temp ={
              examId: x.id,
              examName: x.name,
              phaseNumber: x.phase_count
            }
            
            this.examList.push(temp);
          } else if(this.examList.find(y => y.phaseNumber == x.phase_count && y.examName == x.name)){
            continue;
          } else {
            let temp ={
              examId: x.id,
              examName: x.name,
              phaseNumber: x.phase_count
            }
            
            this.examList.push(temp);
          }
          
        }

        //console.log("exam list here is", this.examList);

      },
      (error) => {
        this.toastr.errorToastr("Some Error Occurred", "Error!");
      })
  }

  get subjectArrayFun() {
    return this.addSubjectForm.get('subjectArray') as FormArray;
  }

  get weightageFun() {
    return this.subForm.get('weightages') as FormArray;
  }

  get subjectNameFun() {
    return this.subForm.get('subjectName').value;
  }


  selectPhaseNumber(event: any) {
    this.examId = event.target.value;
    //console.log("examId is", this.examId)
    for (let x of this.examList) {
      if (x.examId == this.examId) {
        this.addSubjectForm.controls['examName'].setValue(x.examName);
        this.addSubjectForm.controls['phaseNumber'].setValue(x.phaseNumber);
      }
    }
    this.phaseNumber = this.addSubjectForm.controls['phaseNumber'].value
    //console.log("phaseNumber is", this.addSubjectForm.controls['phaseNumber'].value)

    if (this.subjectArrayFun.length > 1) {
      for (let j = this.subjectArrayFun.length; j > 0; j--) {
        this.subjectArrayFun.removeAt(j);

      }
      //console.log("inside subjectArray fun", this.subjectArrayFun.length)
    }

    if (this.weightageFun.length > 0) {
      for (let j = this.weightageFun.length; j >= 0; j--) {
        this.weightageFun.removeAt(j);

      }
    }
    this.weightageFun.clear();
    this.subjectArrayFun.reset();

    let weightlen = this.weightageFun.length

    if (weightlen < this.phaseNumber) {
      // console.log(weightlen)
      // console.log(this.phaseNumber)
      for (let i = 0; i < this.phaseNumber; i++) {
        //console.log("inside for loop")
        this.weightageFun.push(this.fb.group({
          weightage: ['', Validators.required],
        }));

      }
      //console.log("weightage array is", this.weightageFun);
      weightlen = this.phaseNumber;
      //console.log(weightlen)
    } else {
      for (let i = weightlen - 1; i >= this.phaseNumber; i--) {
        //console.log("inside else for loop")
        this.weightageFun.removeAt(i);
      }
      weightlen = this.weightageFun.length
      //console.log(weightlen)
    }

  }

  public addMoreSubject(): any {
    if (this.addSubjectForm.valid) {
      this.subjectArrayFun.push(this.createSubjectForm());

      let weightlen = this.weightageFun.length
      if (weightlen < this.phaseNumber) {
        //console.log(weightlen)
        this.weightageFun.reset();

        for (let i = 0; i < this.phaseNumber; i++) {
          this.weightageFun.push(this.fb.group({
            weightage: ['', Validators.required],
          }));
        }
        weightlen = this.phaseNumber;
        //console.log(weightlen)
      } else {
        for (let i = weightlen = 1; i >= this.phaseNumber; i--) {
          this.weightageFun.removeAt(i);

        }
        weightlen = this.weightageFun.length
      }
    }
  }

  public goToExamination(): any {
    this.router.navigate(['/examination']);
  }

  onReset() {
    location.reload()
  }


  onSubmit() {
    console.log(this.addSubjectForm.value);

  }

  ngOnDestroy() {
  }

}
