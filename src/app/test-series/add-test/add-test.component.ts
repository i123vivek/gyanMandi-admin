import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import * as $ from 'jquery';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
  providers: [Location]
})
export class AddTestComponent implements OnInit, OnDestroy {

  public testList= [
    {
      InstituteName : "Akash",
      examList:[
        {
          examName:"IITJEE",
          testSeriesList:[
            {
              year: 2020,
              testSeriesName: ["testSeries1","testSeries2","testSeries3"]
            },
            {
              year: 2021,
              testSeriesName: ["testSeries4","testSeries5","testSeries6"]
            }
          ]
        },
        {
          examName:"GATE",
          testSeriesList:[
            {
              year: 2022,
              testSeriesName: ["tSeries1","tSeries2","tSeries3"]
            },
            {
              year: 2023,
              testSeriesName: ["tSeries4","tSeries5","tSeries6"]
            }
          ]
        }
      ]
    },
    {
      InstituteName : "Prerna",
      examList:[
        {
          examName:"MAT",
          testSeriesList:[
            {
              year: 2020,
              testSeriesName: ["testSeries1","testSeries2","testSeries3"]
            },
            {
              year: 2021,
              testSeriesName: ["testSeries4","testSeries5","testSeries6"]
            }
          ]
        },
        {
          examName:"CAT",
          testSeriesList:[
            {
              year: 2022,
              testSeriesName: ["tSeries1","tSeries2","tSeries3"]
            },
            {
              year: 2023,
              testSeriesName: ["tSeries4","tSeries5","tSeries6"]
            }
          ]
        }
      ]
    }
  ]
  test: FormGroup;

  constructor(private fb: FormBuilder, public toastr: ToastrManager, private location: Location, private _route: ActivatedRoute, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.test = this.fb.group({
      instituteName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      examName: ['',Validators.required],
      examYear: ['',Validators.required],
    })
  }

  ngOnDestroy(){
  }

}
