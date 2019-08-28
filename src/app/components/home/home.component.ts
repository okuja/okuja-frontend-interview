import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../services/home/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  new_math_operation:any;
  math_operation_form: FormGroup;
  all_math_operations: any[] = [];
  response: any;
  math_response_operations: any

  constructor(
    private form_builder: FormBuilder,
    private _homeService: HomeService
  ) { }

  ngOnInit() {
    this.math_operation_form = this.form_builder.group({
      number_one:['',Validators.required],
      number_two:['',Validators.required],
      math_operation:['',Validators.required]

    });
  }

  sendMathOperation(form: FormGroup){

    console.log(this.math_operation_form.value)
    var form_number_one = form.value.number_one;
    var form_number_two = form.value.number_two;
    var form_math_operation = form.value.math_operation;
    var expression = form_number_one + form_math_operation + form_number_two

    // switch(form_math_operation){
    //   case 'add':
    //       break
    //   case 'subtract':
    //       break
    //   case 'multiply':
    //       break
    //   case 'divide':
    //       break  
    // }


    this.new_math_operation = {
      "expr":expression,
      "precision": 14
    };

    console.log(this.new_math_operation)
    
    this._homeService.post_math_operation(this.new_math_operation).subscribe(
      res =>{
      console.log(res);
      this.response = res;
      this.math_response_operations = {
        number_one:form_number_one,
        number_two:form_number_two,
        response:this.response.result,
        expected:form_number_one,
        passed:"yes"
      }

      this.all_math_operations.push(this.math_response_operations)
      console.log(this.all_math_operations)

      // this.response_message = 'Your complaint has been successfully sent.';
      // this.show_complaint_success_message = true;
      // this.compliant_loading = false;
      },
      err => {
        console.log(err);
      //   this.response_message = 'Check your internet connection and try again.';
      //   this.show_complaint_error_message = true;
      //  this.compliant_loading = false;
      });  

  }

}
