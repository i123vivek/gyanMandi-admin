import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map } from  'rxjs/operators';
import { Router } from '@angular/router';
import { Options } from 'selenium-webdriver/opera';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private url = 'http://localhost:8000';
  //private url = 'http://35.224.20.11:8000';

  constructor(public http: HttpClient, public router: Router) { }

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  public getExamInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('examInfo'));
  }

  public setExamInfoInLocalStorage = (data) => {
    localStorage.setItem('examInfo', JSON.stringify(data))
  }

  public createGender(data: any) : Observable<any>{
    const params = new HttpParams()
      .set('gender_code', data)
    return this.http.post(`${this.url}/students/gender/2/`,data, this.options)
  }


  public getGender(): Observable<any>{
    return this.http.get(`${this.url}/students/gender/2/`)
  }

  public createExam(file): Observable<any>{
    return this.http.post(`${this.url}/exams/api/v1/new`,file)
  }

  public getExamDetails(): Observable<any>{
    return this.http.get(`${this.url}/api/v1/exams/subject/create`)
  }
}
