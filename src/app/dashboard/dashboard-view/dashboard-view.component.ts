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

  p: number = 1;
  count: number = 5;
  kind: any;

  constructor(public dashboardService: DashboardService, public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { }

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

    // this.instituteList = [
    //   {
    //     Id: '1',
    //     InstituteName: 'FIIT JEE',
    //     MobileNumber: '9801218546',
    //     Email: 'fiitjee@gmail.com',
    //     City: 'Navi Mumbai',
    //     State: 'Maharashtra',
    //     Status: 'Active'
    //   },
    //   {
    //     Id: '2',
    //     InstituteName: 'Prerna',
    //     MobileNumber: '9801218546',
    //     Email: 'prerna@gmail.com',
    //     City: 'Jamshedpur',
    //     State: 'Jharkhand',
    //     Status: 'Active'
    //   },
    //   {
    //     Id: '3',
    //     InstituteName: 'Akash',
    //     MobileNumber: '9801218546',
    //     Email: 'akash@gmail.com',
    //     City: 'Navi Mumbai',
    //     State: 'Maharashtra',
    //     Status: 'Active'
    //   },
    //   {
    //     Id: '4',
    //     InstituteName: 'Goal',
    //     MobileNumber: '9801218546',
    //     Email: 'goal@gmail.com',
    //     City: 'Ranchi',
    //     State: 'Jharkhand',
    //     Status: 'Active'
    //   }
    // ];

    // this.studentList = [
    //   {
    //     Id: '1',
    //     StudentName: 'student1',
    //     InstituteName: 'Akash',
    //     ExamName: 'IIT JEE',
    //     ExamYear: '2020',
    //     ProductType: 'Test-series',
    //     City: 'Ranchi',
    //     State: 'Jharkhand',
    //     Status: 'Active'
    //   },
    //   {
    //     Id: '2',
    //     StudentName: 'student2',
    //     InstituteName: 'Alpine',
    //     ExamName: 'JAC',
    //     ExamYear: '2020',
    //     ProductType: 'Test-series',
    //     City: 'Ranchi',
    //     State: 'Jharkhand',
    //     Status: 'Active'
    //   },
    //   {
    //     Id: '3',
    //     StudentName: 'student3',
    //     InstituteName: 'Prerna',
    //     ExamName: 'IIT JEE',
    //     ExamYear: '2020',
    //     ProductType: 'Test-series',
    //     City: 'Ranchi',
    //     State: 'Jharkhand',
    //     Status: 'Active'
    //   },
    //   {
    //     Id: '4',
    //     StudentName: 'student4',
    //     InstituteName: 'Newton',
    //     ExamName: 'IIT JEE',
    //     ExamYear: '2020',
    //     ProductType: 'Test-series',
    //     City: 'Ranchi',
    //     State: 'Jharkhand',
    //     Status: 'Active'
    //   }
    // ]

    this.getStudentList();
    this.getInstituteList();

  }

  // public goToInstitutionEdit(): any{
  //   // here to add institution id as route parameter.
  //   this.router.navigate(['/dashboard/institute-edit']);
  // }

  // public goToStudentEdit(): any {
  //   // here to add student id as route parameter.
  //   this.router.navigate(['/dashboard/student-edit']); .students.students
  // }

  public getStudentList = () => {

    this.studentList = [];
    this.dashboardService.getStudentList().subscribe(apiResponse => {
      console.log("apiResponse is", apiResponse)

      if (apiResponse.response_status_code == 200) {
        for (let x of apiResponse.students.students) {
          let temp = {
           
            Id: x.id,
            StudentName: x.name,
            InstituteName: x.institute_name,
            ExamName: x.exam,
            ExamYear: x.year,
            ProductType: x.product_type,
            City: x.city, 
            State: x.state,
            Status: x.status
          }
          this.studentList.push(temp);
        }
      }
    },
    (error) => {
      this.toastr.errorToastr("Some Error Occurred", "Error!");
    })
  }


  public getInstituteList = () => {

    this.instituteList = [];
    this.dashboardService.getInstituteList().subscribe(apiResponse => {
      console.log("apiResponse is", apiResponse)

      if (apiResponse.response_status_code == 200) {
        for (let x of apiResponse.institutes.institutes) {
          let temp = {
           
            Id: x.id,
            InstituteName: x.name,
            MobileNumber: x.mobile,
            Email: x.email,
            City: x.city, 
            State: x.state,
            Status: x.status
          }
          this.instituteList.push(temp);
        }
      }
    },
    (error) => {
      this.toastr.errorToastr("Some Error Occurred", "Error!");
    })
  }

  ngOnDestroy() {
  }

}
