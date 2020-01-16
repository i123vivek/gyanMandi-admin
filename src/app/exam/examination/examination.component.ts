import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit, OnDestroy {

  public examList: any = [];
  public subjectList: any = [];
  public TopicList: any[];
  public QuestionList: any[];


  p: Number = 1;
  count: Number = 5;
  kind: any;
  

  constructor(public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // using HTML5 localStorage Object to keep the current tab active on page Reload.
    $(document).ready(function () {
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        localStorage.setItem('activeTab', $(e.target).attr('href'));
      });
      var activeTab = localStorage.getItem('activeTab');
      if (activeTab) {
        (<any>$('#nav-tab a[href="' + activeTab + '"]')).tab('show');
      }
    });

    

    this.examList = [
      {
        Id: "1",
        ExamName: "IIT JEE",
        NumberOfPhases: "2",
        PreferenceOrder: "1",
        NoOfInstitutes: "23",
        NoOfStudents: "234",
        Status: "Active"
      },
      {
        Id: "2",
        ExamName: "IIT JEE",
        NumberOfPhases: "2",
        PreferenceOrder: "1",
        NoOfInstitutes: "23",
        NoOfStudents: "234",
        Status: "Active"
      },
      {
        Id: "3",
        ExamName: "IIT JEE",
        NumberOfPhases: "2",
        PreferenceOrder: "1",
        NoOfInstitutes: "23",
        NoOfStudents: "234",
        Status: "Active"
      },
      {
        Id: "4",
        ExamName: "IIT JEE",
        NumberOfPhases: "2",
        PreferenceOrder: "1",
        NoOfInstitutes: "23",
        NoOfStudents: "234",
        Status: "Active"
      },
      {
        Id: "5",
        ExamName: "IIT JEE",
        NumberOfPhases: "2",
        PreferenceOrder: "1",
        NoOfInstitutes: "23",
        NoOfStudents: "234",
        Status: "Active"
      }
    ];

    this.subjectList = [
      {
        Id: "1",
        ExamName: "IIT JEE",
        SubjectName: "Mathematics",
        NumberOfTopics: "12",
        NumberOfSubtopics: "111",
      },
      {
        Id: "2",
        ExamName: "PMT",
        SubjectName: "PHYSICS",
        NumberOfTopics: "14",
        NumberOfSubtopics: "123",
      },
      {
        Id: "3",
        ExamName: "GATE",
        SubjectName: "Mathematics",
        NumberOfTopics: "20",
        NumberOfSubtopics: "231",
      },
      {
        Id: "4",
        ExamName: "IIT JEE",
        SubjectName: "Mathematics",
        NumberOfTopics: "12",
        NumberOfSubtopics: "111",
      },
      {
        Id: "5",
        ExamName: "GATE",
        SubjectName: "Mathematics",
        NumberOfTopics: "12",
        NumberOfSubtopics: "111",
      },
      {
        Id: "6",
        ExamName: "IIT JEE",
        SubjectName: "Mathematics",
        NumberOfTopics: "12",
        NumberOfSubtopics: "111",
      },
      {
        Id: "7",
        ExamName: "IIT JEE",
        SubjectName: "Mathematics",
        NumberOfTopics: "12",
        NumberOfSubtopics: "111",
      }
    ];

    this.TopicList =[
      {
        Id: "1",
        ExamName: "IIT JEE",
        TopicName: "Integration",
        Subject: "Mathematics",
        NumberOfSubtopics: "8",
      },
      {
        Id: "2",
        ExamName: "IIT JEE",
        TopicName: "Rotation",
        Subject: "Physics",
        NumberOfSubtopics: "12",
      },
      {
        Id: "3",
        ExamName: "IIT JEE",
        TopicName: "Organic",
        Subject: "Chemistry",
        NumberOfSubtopics: "34"
      }
    ];

    this.QuestionList =[
      {
        Id: "1",
        ExamName: "IIT JEE",
        QuestionCategories: ["Analytics", "Theoretical", "Numerical", "Application"]
      },
      {
        Id: "2",
        ExamName: "IIT JEE",
        QuestionCategories: ["Analytics", "Theoretical", "Numerical", "Application"]
      },
      {
        Id: "3",
        ExamName: "IIT JEE",
        QuestionCategories: ["Analytics", "Theoretical", "Numerical", "Application"]
      }
    ]
  
  
  }

  

  public goToAddExam(): any {
    this.router.navigate(['/examination/addExam']);
  }

  public goToAddSubject(): any {
    this.router.navigate(['/examination/addSubject']);
  }

  public goToAddTopic(): any {
    this.router.navigate(['/examination/addTopic']);
  }

  public goToAddQuestionCategory(): any {
    this.router.navigate(['/examination/addQuestionCategory']);
  }

  ngOnDestroy() {
  }

}
