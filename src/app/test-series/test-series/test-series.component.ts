import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';

@Component({
  selector: 'app-test-series',
  templateUrl: './test-series.component.html',
  styleUrls: ['./test-series.component.css']
})
export class TestSeriesComponent implements OnInit, OnDestroy {

  public testSeriesList: any = [];
  public testList: any = [];
  public QuestionList: any = [];


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

    this.testSeriesList = [
      {
        Id: "1",
        InstituteName: "Akash",
        TestSeries: "Alpha",
        ExamName: "IIT JEE",
        ExamPhase: "Mains",
        ExamYear: "2019",
        Price: "Rs. 300",
        Language: "English, Hindi",
        EnrolledStudents: "76"
      },
      {
        Id: "2",
        InstituteName: "Prerna",
        TestSeries: "Alpha",
        ExamName: "IIT JEE",
        ExamPhase: "Mains",
        ExamYear: "2019",
        Price: "Rs. 300",
        Language: "English, Hindi",
        EnrolledStudents: "76"
      },
      {
        Id: "3",
        InstituteName: "Prerna",
        TestSeries: "Alpha",
        ExamName: "IIT JEE",
        ExamPhase: "Mains",
        ExamYear: "2019",
        Price: "Rs. 300",
        Language: "English, Hindi",
        EnrolledStudents: "76"
      }
    ];

    this.testList = [
      {
        Id: "1",
        InstituteName: "Prerna",
        Test: "kin",
        TestSeries: "Alpha",
        ExamName: "IIT JEE",
        ExamPhase: "Mains",
        ExamYear: "2019",
        Language: "English, Hindi",
        Attempts: "76"
      },
      {
        Id: "2",
        InstituteName: "Akash",
        Test: "beta",
        TestSeries: "Alpha",
        ExamName: "IIT JEE",
        ExamPhase: "Mains",
        ExamYear: "2019",
        Language: "English, Hindi",
        Attempts: "76"
      },
      {
        Id: "3",
        InstituteName: "Prerna",
        Test: "gamma",
        TestSeries: "Alpha",
        ExamName: "IIT JEE",
        ExamPhase: "Mains",
        ExamYear: "2019",
        Language: "English, Hindi",
        Attempts: "76"
      }
    ];

    this.QuestionList = [
      {
        Id: "1",
        InstituteName: "Prerna",
        ExamName: "IIT JEE",
        Subject: "Mathematics",
        QuestionRating: "7.3"
      },
      {
        Id: "2",
        InstituteName: "Akash",
        ExamName: "IIT JEE",
        Subject: "Mathematics",
        QuestionRating: "7.3"
      },
      {
        Id: "3",
        InstituteName: "Prerna",
        ExamName: "IIT JEE",
        Subject: "Mathematics",
        QuestionRating: "7.3"
      }
    ]
  }


  public goToAddTestSeries(): any {
    this.router.navigate(['/test-series/addTestSeries']);
  }

  public goToAddTest(): any {
    this.router.navigate(['/test-series/addTest']);
  }


  ngOnDestroy(){

  }

}
