import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import { DashboardService } from 'src/app/dashboard.service';
//import { ExamService } from 'src/app/exam.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit, OnDestroy {

  public instituteList: any = [];
  public studentList: any = [];

  p: Number = 1;
  count: Number = 5;
  kind: any;

  constructor(public dashboardService: DashboardService,public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { }

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

    this.instituteList = [
      {
        Id: '1',
        InstituteName: 'FIIT JEE',
        MobileNumber: '9801218546',
        Email: 'fiitjee@gmail.com',
        City: 'Navi Mumbai',
        District: 'Mumbai',
        State: 'Maharashtra',
        Status: 'Active'
      },
      {
        Id: '2',
        InstituteName: 'Prerna',
        MobileNumber: '9801218546',
        Email: 'prerna@gmail.com',
        City: 'Jamshedpur',
        District: 'Jamshedpur',
        State: 'Jharkhand',
        Status: 'Active'
      },
      {
        Id: '3',
        InstituteName: 'Akash',
        MobileNumber: '9801218546',
        Email: 'akash@gmail.com',
        City: 'Navi Mumbai',
        District: 'Mumbai',
        State: 'Maharashtra',
        Status: 'Active'
      },
      {
        Id: '4',
        InstituteName: 'Goal',
        MobileNumber: '9801218546',
        Email: 'goal@gmail.com',
        City: 'Ranchi',
        District: 'Ranchi',
        State: 'Jharkhand',
        Status: 'Active'
      }
    ];

    this.studentList = [
      {
        Id: '1',
        StudentName: 'student1',
        InstituteName: 'Akash',
        ExamName: 'IIT JEE',
        ExamYear: '2020',
        ProductType: 'Test-series',
        District: 'Ranchi',
        State: 'Jharkhand',
        Status: 'Active'
      },
      {
        Id: '2',
        StudentName: 'student2',
        InstituteName: 'Alpine',
        ExamName: 'JAC',
        ExamYear: '2020',
        ProductType: 'Test-series',
        District: 'Ranchi',
        State: 'Jharkhand',
        Status: 'Active'
      },
      {
        Id: '3',
        StudentName: 'student3',
        InstituteName: 'Prerna',
        ExamName: 'IIT JEE',
        ExamYear: '2020',
        ProductType: 'Test-series',
        District: 'Ranchi',
        State: 'Jharkhand',
        Status: 'Active'
      },
      {
        Id: '4',
        StudentName: 'student4',
        InstituteName: 'Newton',
        ExamName: 'IIT JEE',
        ExamYear: '2020',
        ProductType: 'Test-series',
        District: 'Ranchi',
        State: 'Jharkhand',
        Status: 'Active'
      }
    ]

  }

  // public goToInstitutionEdit(): any{
  //   // here to add institution id as route parameter.
  //   this.router.navigate(['/dashboard/institute-edit']);
  // }

  // public goToStudentEdit(): any {
  //   // here to add student id as route parameter.
  //   this.router.navigate(['/dashboard/student-edit']);
  // }

  ngOnDestroy(){
  }

}
