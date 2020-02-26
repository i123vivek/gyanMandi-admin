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
  phase_count: any;
  examName: any;
  addSubjectForm: FormGroup;
  submitted: boolean;
  subForm: FormGroup;
  examId: any;
  weight: any;
  subName: any;

  constructor(private fb: FormBuilder, public examService: ExamService, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    // var div = document.getElementById('exForm');
    // var btn = document.getElementById('topicButton');
    // btn.onclick = function (e) {
    //   let elements = div.querySelectorAll('input, select, textarea, checkbox, radio, button');

    //   for (let i = 0; i < elements.length; i++) {
    //     elements[i].setAttribute('disabled', 'true');
    //   }
    // }

    //console.log("initial exam list",this.examList)

    this.addSubjectForm = this.fb.group({
      examId: ['',Validators.required],
      examName: ['', Validators.required],
      phase_count: ['', Validators.required],
      subjectStatus: ['',Validators.required],
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
        console.log("api response for getting exam list", apiResponse.executed_exams)
        for(let x of apiResponse.executed_exams){
          if(this.examList.length == 0){
            let temp ={
              examId: x.id,
              examName: x.name,
              phase_count: x.phase_count
            }
            
            this.examList.push(temp);
          } else if(this.examList.find(y => y.phase_count == x.phase_count && y.examName == x.name)){
            continue;
          } else {
            let temp ={
              examId: x.id,
              examName: x.name,
              phase_count: x.phase_count
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


  selectphase_count(event: any) {
    this.examId = event.target.value;
    //console.log("examId is", this.examId)
    for (let x of this.examList) {
      if (x.examId == this.examId) {
        this.addSubjectForm.controls['examName'].setValue(x.examName);
        this.addSubjectForm.controls['phase_count'].setValue(x.phase_count);
      }
    }
    this.phase_count = this.addSubjectForm.controls['phase_count'].value
    //console.log("phase_count is", this.addSubjectForm.controls['phase_count'].value)

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

    if (weightlen < this.phase_count) {
      // console.log(weightlen)
      // console.log(this.phase_count)
      for (let i = 0; i < this.phase_count; i++) {
        //console.log("inside for loop")
        this.weightageFun.push(this.fb.group({
          weightage: ['', Validators.required],
          phaseId: [i+1,Validators.required]
        }));

      }
      //console.log("weightage array is", this.weightageFun);
      weightlen = this.phase_count;
      //console.log(weightlen)
    } else {
      for (let i = weightlen - 1; i >= this.phase_count; i--) {
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
      if (weightlen < this.phase_count) {
        //console.log(weightlen)
        this.weightageFun.reset();

        for (let i = 0; i < this.phase_count; i++) {
          this.weightageFun.push(this.fb.group({
            weightage: ['', Validators.required],
            phaseId: [i+1,Validators.required]
          }));
        }
        weightlen = this.phase_count;
        //console.log(weightlen)
      } else {
        for (let i = weightlen = 1; i >= this.phase_count; i--) {
          this.weightageFun.removeAt(i);

        }
        weightlen = this.weightageFun.length
      }
    }
  }

  public addSubject = () => {

    this.weight = []
    for(let x of this.weightageFun.controls){
      //console.log("value",x.get('weightage').value)

      let temp = {
        "weightage": x.get('weightage').value,
        "executed_exam_phase_id":x.get('phaseId').value
      }
      this.weight.push(temp)
    }
    //this.weight = this.weightageFun.controls
    this.subName = this.subjectNameFun

    console.log("weightage is",this.weight);

    

    var formData = new FormData();

    formData.append('executed_exam_id',this.examId);
    formData.append('is_active',this.addSubjectForm.controls['subjectStatus'].value)
    //console.log("form data",formData.get('name'));
    //formData.append('phase_count', this.phase_count);
    //formData.append('weightages', this.weight); //this.status
    formData.append('name', this.subName); //this.examPattern
    // formData.append('syllabus', this.Syllabus); //this.Syllabus
    // formData.append('about', this.aboutExam); //this.aboutExam
    var data = {"phase_weightages" : this.weight} ;
    // if (this.phaseNumber == 3) {
    //   var data = { "phases": phaseObjForPhase3 };
    // } else if (this.phaseNumber == 2) {
    //   var data = { "phases": phaseObjForPhase2 };
    // } else if (this.phaseNumber == 1) {
    //   var data = { "phases": phaseObjForPhase1 };
    // }

    // if (examImageFileCount > 0) {
    //   for (let i = 0; i < examImageFileCount; i++) {
    //     formData.append('image_url', inputEl.files[i]);
    //   }
    // }
    // // if (examPatternFileCount > 0) {
    // //   for (let i = 0; i < examPatternFileCount; i++) {
    // //     formData.append('pattern_pdf', inputElP.files[i]);
    // //   }
    // // }
    // // if (examSyllabusFileCount > 0) {
    // //   for (let i = 0; i < examSyllabusFileCount; i++) {
    // //     formData.append('syllabus_pdf', inputElS.files[i]);
    // //   }
    // // }
    // // if (aboutExamFileCount > 0) {
    // //   for (let i = 0; i < aboutExamFileCount; i++) {
    // //     formData.append('about_pdf', inputElA.files[i]);
    // //   }
    // // }

    let jsonObject = {};

    console.log("form data entries is", formData.entries());

    for (const [key, value] of formData.entries()) {
      jsonObject[key] = value;
    }

    var dataObj = { ...jsonObject, ...data }

    console.log("object is", dataObj)


    this.examService.addSubject(dataObj).subscribe(

      data => {
        console.log('data to add subject', data);
        this.toastr.successToastr("subject added")
        this.router.navigate(['/examination']);
      },
      error => {
        console.log('error to add subject ', error)
        this.toastr.errorToastr("some error occured");
        this.router.navigate(['/examination']);
      }
    )
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
