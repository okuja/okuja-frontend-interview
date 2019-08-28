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

    this.new_math_operation = {
      "expr":expression,
      "precision": 14
    };

    console.log(this.new_math_operation)
    
    this._homeService.post_math_operation(this.new_math_operation).subscribe(
      res =>{
      console.log(res);
      this.response = res;
      var status:any
      var rounded_number = Math.round(Math.random());
      var final_response:any

      if (rounded_number == 1){
        var second_random_number = (Math.random())*4000;
        var ceiling_number = Math.ceil(second_random_number)
        final_response = ceiling_number
        console.log("Final Response in if  : "+final_response)        
      }
      else{
        final_response = this.response.result
        console.log("Final Response in else  : "+final_response)
      }
      console.log("Expression   : "+ eval(expression))

      if (final_response == eval(expression)){
        status = "yes"
      }
      else{
        status = "no"
      }

      
      this.math_response_operations = {
        number_one:form_number_one,
        number_two:form_number_two,
        response:final_response,
        expected:eval(expression),
        passed: status
      }

      this.all_math_operations.push(this.math_response_operations)
      console.log(this.all_math_operations)
      },
      err => {
        console.log(err);
      });  

  }

  deleteItem(i)
 {  
    this.all_math_operations.splice(i,1);  
 }

}
