import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  sectionOfTest: any;

  constructor(public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { 

    this._route.params.subscribe(params => {
      this.sectionOfTest = params['sectionOfTest'];
    
      console.log("section of test :",`${this.sectionOfTest}`);
      });
  }

  ngOnInit() {
  }


  ngOnDestroy(){}
}
