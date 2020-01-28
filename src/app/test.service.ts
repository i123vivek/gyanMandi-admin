import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TreeviewItem } from 'ngx-treeview';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Options } from 'selenium-webdriver/opera';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  // private url = 'http://localhost:8000';
  private url = 'http://35.224.20.11:8000';

  constructor(public http: HttpClient, public router: Router) { }

  getSyllabus(): TreeviewItem[] {
    const syllabusCategory = new TreeviewItem({
      text: 'Syllabus1', value: 'Syllabus1', checked: false, collapsed: true, children: [
        { text: 'topic1', value: 'topic1', checked: false },
        { text: 'topic2', value: 'topic2', checked: false },
        { text: 'topic3', value: 'topic3', checked: false }
      ]

    });
    const syllabusCategory1 = new TreeviewItem({
      text: 'Syllabus2', value: 'Syllabus2', checked: false, collapsed: true, children: [
        { text: 'topic4', value: 'topic4', checked: false },
        { text: 'topic5', value: 'topic5', checked: false },
        { text: 'topic6', value: 'topic6', checked: false }
      ]
    });
    const syllabusCategory2 = new TreeviewItem({
      text: 'Syllabus3', value: 'Syllabus3', checked: false, collapsed: true, children: [
        { text: 'topic7', value: 'topic7', checked: false },
        { text: 'topic8', value: 'topic8', checked: false },
        { text: 'topic9', value: 'topic9', checked: false }
      ]
    });
    return [syllabusCategory, syllabusCategory1, syllabusCategory2];
  }

}
