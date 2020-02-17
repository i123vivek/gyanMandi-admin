import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit, OnDestroy {

  p: Number = 1;
  count: Number = 5;
  QuestionPageList: any = [];
  testSeries: any;
  test: any;
  sectionOfTest: any;

  constructor(public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) {

    this._route.params.subscribe(params => {
      this.testSeries = params['testSeries'];
      this.test = params['test'];
      // this.sectionOfTest = params['sectionOfTest'];
    
      console.log(`${this.testSeries},${this.test}`);
      });
   }

  ngOnInit() {
    this.QuestionPageList = [
      {
        Id: "1",
        QuestionType: "simple",
        Section: "section 1",
        Subject: "Mathematics",
        Topic: "integration",
        QuestionRating: "7.3",
        Language: "english",
      },
      {
        Id: "2",
        QuestionType: "paragraph",
        Section: "section 2",
        Subject: "Mathematics",
        Topic: "integration",
        QuestionRating: "7.3",
        Language: "english",
      },
      {
        Id: "3",
        QuestionType: "segment",
        Section: "section 2",
        Subject: "Mathematics",
        Topic: "integration",
        QuestionRating: "7.3",
        Language: "english",
      },
    ]
  } 


  public goToTest(): any {
    this.router.navigate(['/test-series']);
  }

  public goToAddQuestion(): any {
    this.router.navigate(['/test-series',this.testSeries,this.test,'addQuestion']);
  }

  ngOnDestroy(){
  }

}
