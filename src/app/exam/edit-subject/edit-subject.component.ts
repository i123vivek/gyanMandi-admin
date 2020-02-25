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
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css'],
  providers: [Location]
})
export class EditSubjectComponent implements OnInit, OnDestroy {

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
    var div = document.getElementById('exForm');
    var btn = document.getElementById('topicButton');
    btn.onclick = function (e) {
      let elements = div.querySelectorAll('input, select, textarea, checkbox, radio, button');

      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'true');
      }
    }

    this.getExamList();
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



  public goToExamination(): any {
    this.router.navigate(['/examination']);
  }

  onReset() {
    location.reload()
  }

  ngOnDestroy(){
  }

}
