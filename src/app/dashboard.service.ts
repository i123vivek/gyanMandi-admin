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
export class DashboardService {

  private url = 'http://localhost:8000';

  constructor(public http: HttpClient, public router: Router) { }

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  public getStudentInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('studentInfo'));
  }

  public setStudentInfoInLocalStorage = (data) => {
    localStorage.setItem('studentInfo', JSON.stringify(data))
  }

  public getStudentList(): Observable<any>{
    console.log("inside getStudentList service");
    return this.http.get(`${this.url}/students/all/`)
  }

  public getInstituteInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('instituteInfo'));
  }

  public setInstituteInfoInLocalStorage = (data) => {
    localStorage.setItem('instituteInfo', JSON.stringify(data))
  }

  public getInstituteList(): Observable<any>{
    console.log("inside getInstituteList service");
    return this.http.get(`${this.url}/institute/all/`)
  }
}
