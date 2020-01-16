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
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css'],
  providers: [Location]
})
export class AddTopicComponent implements OnInit, OnDestroy {

  public subjectList = [
    {
      examName: 'IIT JEE',
      phaseNumber: 3,
      subjectName: ["Mathmetics", "Physics", "Chemistry"]
    },
    {
      examName: 'PMT',
      phaseNumber: 2,
      subjectName: ["Mathmetics", "Physics", "Chemistry"]
    },
    {
      examName: 'GATE',
      phaseNumber: 1,
      subjectName: ["Mathmetics", "Physics", "Chemistry"]
    }
  ];
  addTopicForm: FormGroup;
  examName: any;
  subArray: string[];
  phaseNumber: any;



  constructor(private fb: FormBuilder, public examService: ExamService, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    var div = document.getElementById('subForm');
    var btn = document.getElementById('topicButton');
    btn.onclick = function (e) {
      let elements = div.querySelectorAll('input, select, textarea, checkbox, radio, button');

      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'true');
      }
    }

    $(".repeat").on('click', function (e) {
      e.preventDefault();
      var $self = $(this);
      $self.before($self.prev('div').clone().find("input:text").val("").end());
    });

    this.addTopicForm = this.fb.group({
      subject_details: this.fb.group({
        examName: ['', Validators.required],
        phaseNumber: ['', Validators.required],
        subjectName: ['', Validators.required]
      }),
      marks: new FormArray([]),
      topics: this.fb.array([this.topics()])
    });
  }

  topics() {
    return this.fb.group({
      topicName: ['', Validators.required],
      subTopic: ['', Validators.required],
      studyingHours: ['', Validators.required],
      practicingHours: ['', Validators.required]
    });
  };

  getTopics(form) {
    return form.controls.topics.controls;
  }

  get f() { return this.addTopicForm.controls; }
  get t() { return this.f.marks as FormArray; }

  selectedExamObj(event) {
    this.examName = event.target.value;
    console.log("examName is", this.examName);

    for (let x of this.subjectList) {
      if (x.examName == this.examName) {
        console.log("phase value", x.phaseNumber);
        this.phaseNumber = x.phaseNumber;
        this.addTopicForm.get(['subject_details', 'phaseNumber']).patchValue(x.phaseNumber);
        console.log("phase number of selected exam is:", this.addTopicForm.get(['subject_details', 'phaseNumber']).value);

        this.subArray = x.subjectName;
        console.log("subject array is", this.subArray)
      }
    }


    if (this.t.length < this.phaseNumber) {
      for (let i = this.t.length; i < this.phaseNumber; i++) {
        this.t.push(this.fb.group({
          percentageOfMarks: ['', Validators.required],
          standardDeviationOfPercentageOfMarks: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.t.length; i >= this.phaseNumber; i--) {
        this.t.removeAt(i);
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
    console.log(this.addTopicForm.value);
  }


  ngOnDestroy() { }

}
