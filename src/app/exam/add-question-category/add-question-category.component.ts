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
  selector: 'app-add-question-category',
  templateUrl: './add-question-category.component.html',
  styleUrls: ['./add-question-category.component.css'],
  providers: [Location]
})
export class AddQuestionCategoryComponent implements OnInit, OnDestroy {

  public examList = [
    {
      examName: 'IIT JEE'
    },
    {
      examName: 'PMT'
    },
    {
      examName: 'GATE'
    }
  ];
  addQuestionForm: FormGroup;

  constructor(private fb: FormBuilder, public examService: ExamService, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {

    var div = document.getElementById('exForm');
    var btn = document.getElementById('questionButton');
    btn.onclick = function (e) {
      let elements = div.querySelectorAll('input, select, textarea, checkbox, radio, button');

      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'true');
      }
    }

    this.addQuestionForm = this.fb.group({
      examName: ['', Validators.required],
      questionCategory: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    })
  }


  get questionCategory(){
    return this.addQuestionForm.get('questionCategory') as FormArray;
  }

  addNewQuestionCategory(){
    this.questionCategory.push(this.fb.control('', Validators.required));
  }

  public goToExamination(): any {
    this.router.navigate(['/examination']);
  }

  onReset() {
    location.reload()
  }

  onSubmit() {
    console.log(this.addQuestionForm.value);
  }


  ngOnDestroy(){}

}
