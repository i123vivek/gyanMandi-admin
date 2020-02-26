import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import { ExamService } from 'src/app/exam.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  modalRef: BsModalRef;


  p: number = 1;
  count: number = 5;
  kind: any;
  

  constructor(public examService: ExamService,public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router, private modalService: BsModalService) { }

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
  
    this.getExamList();
    this.getSubjectList();
  
  }

  openConfirmationModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public getSubjectList:any = ()=>{
    this.subjectList=[];
    this.examService.getSubjectList().subscribe((apiResponse) =>{
      console.log("apiresponse status is",apiResponse.response_status_code)

      if(apiResponse.response_status_code === 200){

        console.log("exam name in get subject list is",apiResponse.subjects.examName)
        
        // for(let x of apiResponse.subjects){
          for (let y of apiResponse.subjects.subjects){
            let temp = {
              Id: y.id,
              ExamName: apiResponse.subjects.examName ,
              SubjectName:y.name ,
              subjectStatus: "Active",
              NumberOfTopics: apiResponse.subjects.topic_count,
              NumberOfSubtopics: apiResponse.subjects.subtopic_count,
            }
            this.subjectList.push(temp);
          }
          
        // }
      }
      
    },(error) => {
      this.toastr.errorToastr("Some Error Occurred", "Error!");
    })
  }

  public getExamList:any = () =>{
    this.examList= [];
      this.examService.getExamList().subscribe((apiResponse) =>{
        console.log("apiresponse is",apiResponse.executed_exams);
        for(let x of apiResponse.executed_exams){
          if(x.status == true){
            let temp ={
              Id: x.id,
              ExamName: x.name,
              NumberOfPhases: x.phase_count,
              // PreferenceOrder: "1",
              NoOfInstitutes: "23",
              NoOfStudents: "234",
              Status: "Active"
            }
          this.examList.push(temp);
          
          }

          if(x.status == false){
            let temp ={
              Id: x.id,
              ExamName: x.name,
              NumberOfPhases: x.phase_count,
              // PreferenceOrder: "1",
              NoOfInstitutes: "23",
              NoOfStudents: "234",
              Status: "Inactive"
            }
          this.examList.push(temp);
          
          }
          //this.examList.push(temp);
        }

      },
      (error) => {
        this.toastr.errorToastr("Some Error Occurred", "Error!");
      })
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
