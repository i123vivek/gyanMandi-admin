import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";
import { DashboardService } from 'src/app/dashboard.service';
import { CountriesService } from 'src/app/countries.service';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  providers: [Location]
})
export class StudentEditComponent implements OnInit, OnDestroy {

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];

  public productDetails = [
    {
      instituteName: "FIIT JEE PVT.LTD.",
      examName: "IIT JEE",
      productName: "product1",
      dateOfJoining: "20/02/2020",
      examYear: "2020",
      productType: "Test Series"
    },
    {
      instituteName: "Prerna",
      examName: "IIT JEE",
      productName: "product2",
      dateOfJoining: "20/02/2020",
      examYear: "2020",
      productType: "Test Series"
    }
  ]


  constructor(private fb: FormBuilder,private country:CountriesService, public dashboardService: DashboardService, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(){
    this.country.allCountries().
    subscribe(
      data => {
        for(let country of data.Countries){
          if(country.CountryName == "India"){
            this.countryInfo=country;
            //console.log('country Data is:', this.countryInfo);
            this.stateInfo = country.States;
            //console.log("state info is:",this.stateInfo)
          }
        }
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
    //console.log(this.cityInfo);
  }

  ngOnDestroy(){
  }

}
