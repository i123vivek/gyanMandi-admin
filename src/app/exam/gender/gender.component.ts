import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';
import { ExamService } from 'src/app/exam.service';


@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  providers: [ExamService]
})
export class GenderComponent implements OnInit, OnDestroy {
  gender_code : number;
  gender: string;
  name:string;

  constructor(private fb: FormBuilder, private service: ExamService, public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //this.setGender()
    console.log("name is",this.name)
    this.getGender()
  }

  public setGender = () =>{

    let data = {"gender_code":this.gender_code};

    this.service.createGender(data).subscribe(apiResponse =>{
      
      if(apiResponse.status == 200){
        this.toastr.successToastr("gender is set successfully")
        console.log("apiResponse for selecting gender is", apiResponse);
        if(apiResponse.gender == 1){
          this.gender = 'Male';
          this.name = apiResponse.name
        } else if(apiResponse.gender == 2){
          this.gender = 'Female';
          this.name = apiResponse.name
        } else if(apiResponse.gender == 3){
          this.gender = 'Trasgendar';
          this.name = apiResponse.name
        } else{
          console.log("gender code does not match");
        }
      } else {
        this.toastr.errorToastr(apiResponse)
        console.log("error for api response is",apiResponse)
      }
    }, (error) => {
      this.toastr.errorToastr(error)
      console.log("error is",error)

    })
  }

  public getGender = () =>{
    this.service.getGender().subscribe(apiResponse =>{
      console.log("apiResponse is",apiResponse)
    })
  }


  ngOnDestroy(){
  }

}
