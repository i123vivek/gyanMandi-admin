import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import { ClassroomService } from 'src/app/classroom.service';

@Component({
  selector: 'app-classroom-dashboard',
  templateUrl: './classroom-dashboard.component.html',
  styleUrls: ['./classroom-dashboard.component.css']
})
export class ClassroomDashboardComponent implements OnInit, OnDestroy {

  public classroomList: any = [];
  public studentList: any = [];

  p: Number = 1;
  count: Number = 5;
  kind: any;

  constructor(public classroomService: ClassroomService,public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { }

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

    this.classroomList = [
      {
        Id: '1',
        InstituteName: 'FIIT JEE',
        ExamStream: 'IIT JEE',
        Year: '2020',
        BatchName: 'A1',
        NumberOfStudents: '50'
      },
      {
        Id: '2',
        InstituteName: 'Prerna',
        ExamStream: 'AIEEE',
        Year: '2020',
        BatchName: 'A2',
        NumberOfStudents: '100'
      },
      {
        Id: '3',
        InstituteName: 'Akash',
        ExamStream: 'AIIMS',
        Year: '2020',
        BatchName: 'B1',
        NumberOfStudents: '66'
      },
      {
        Id: '4',
        InstituteName: 'FIIT JEE',
        ExamStream: 'IIT JEE',
        Year: '2020',
        BatchName: 'A1',
        NumberOfStudents: '50'
      }
    ];

    this.studentList = [
      {
        Id: '1',
        InstituteName: 'FIIT JEE',
        ExamName: 'IIT JEE',
        Year: '2020',
        StudentName: 'student1',
        Contact: '9031486059',
        ProductType: 'Test Series'
      },
      {
        Id: '2',
        InstituteName: 'Akash',
        ExamName: 'AIIMS',
        Year: '2021',
        StudentName: 'student2',
        Contact: '9031486059',
        ProductType: 'Test Series'
      },
      {
        Id: '3',
        InstituteName: 'Prerna',
        ExamName: 'AIEEE',
        Year: '2021',
        StudentName: 'student3',
        Contact: '9031486059',
        ProductType: 'Test Series'
      },
      {
        Id: '4',
        InstituteName: 'FIIT JEE',
        ExamName: 'IIT JEE',
        Year: '2020',
        StudentName: 'student4',
        Contact: '9031486059',
        ProductType: 'Test Series'
      }
    ]
  }


  public addClassroom(): any{
    this.router.navigate(['/classroom/addClassroom']);
  }

  public addStudent(): any {
    this.router.navigate(['/classroom/addStudent']);
  }

  ngOnDestroy(){
  }

}
